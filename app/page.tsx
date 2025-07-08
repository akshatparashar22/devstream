"use client";

import { useRef, useState } from "react";
import { ArrowUpTrayIcon, ArrowUpOnSquareStackIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { sourceCodePro } from "./ui/fonts";
import { chatWithClaude } from "./lib/claudeChat";
import { Timeline } from "./ui/components/Timeline";
import ThemeSwitcher from "./ui/components/ThemeSwitcher";

interface TimelineItem {
  title: string;
  content: React.ReactNode;
  date: string;
}

interface ProcessingState {
  isProcessing: boolean;
  isComplete: boolean;
  error: string | null;
}

interface ResumeSummary {
  totalExperience: string;
  currentRole: string;
  keySkills: string[];
  education: string;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    isComplete: false,
    error: null,
  });
  const [timelineData, setTimelineData] = useState<TimelineItem[] | null>(null);
  const [resumeSummary, setResumeSummary] = useState<ResumeSummary | null>(null);

  const handleFile = (file: File) => {
    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 1024 * 1024; // 1MB

    if (!allowedTypes.includes(file.type)) {
      setProcessingState({
        isProcessing: false,
        isComplete: false,
        error: 'Please upload a PDF or Word document (.pdf, .doc, .docx)',
      });
      return;
    }

    if (file.size > maxSize) {
      setProcessingState({
        isProcessing: false,
        isComplete: false,
        error: 'File size must be less than 1MB',
      });
      return;
    }

    setUploadedFile(file);
    setProcessingState({
      isProcessing: false,
      isComplete: false,
      error: null,
    });
  };

  const handleSubmit = async () => {
    if (!uploadedFile) return;

    setProcessingState({
      isProcessing: true,
      isComplete: false,
      error: null,
    });

    try {
      const response = await chatWithClaude(uploadedFile);
      console.log("Parsed response from Claude:", response);

      // Parse the response to extract timeline data
      const timelineItems = parseTimelineFromResponse(response);
      setTimelineData(timelineItems);

      // Extract summary if available
      if (response.summary) {
        setResumeSummary(response.summary);
      }

      setProcessingState({
        isProcessing: false,
        isComplete: true,
        error: null,
      });
    } catch (err) {
      console.error("Error during Claude processing", err);
      setProcessingState({
        isProcessing: false,
        isComplete: false,
        error: 'Failed to process resume. Please try again.',
      });
    }
  };

  const parseTimelineFromResponse = (response: any): TimelineItem[] => {
    try {
      // If response is already parsed JSON from our enhanced Claude function
      if (response.timeline && Array.isArray(response.timeline)) {
        return response.timeline.map((item: any) => ({
          title: item.year,
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {item.title}
                    </h4>
                    {item.company && (
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {item.company}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.type === 'work' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    item.type === 'education' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      item.type === 'certification' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                    {item.type || 'experience'}
                  </span>
                </div>

                {item.duration && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    📅 {item.duration}
                  </p>
                )}

                {item.location && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    📍 {item.location}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {item.description}
                  </p>
                )}

                {item.details && Array.isArray(item.details) && item.details.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      Key Highlights:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      {item.details.map((detail: string, idx: number) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ),
          date: item.year,
        }));
      }

      // Fallback for raw Claude response
      const textContent = response.find((item: any) => item.type === 'text')?.text;
      if (textContent) {
        const jsonMatch = textContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsedData = JSON.parse(jsonMatch[0]);
          return parseTimelineFromResponse(parsedData);
        }
      }
    } catch (error) {
      console.error("Error parsing timeline data:", error);
    }

    return [];
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setTimelineData(null);
    setResumeSummary(null);
    setProcessingState({
      isProcessing: false,
      isComplete: false,
      error: null,
    });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <ThemeSwitcher />
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${sourceCodePro.className}`}>
            DevStream
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Transform your resume into a beautiful, recruiter-ready timeline
          </p>
        </div>


        {/* Main Content */}
        <div className="space-y-8">
          {!processingState.isComplete && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
              {/* Upload Area */}
              <div
                className={`w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer
                  ${isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-105'
                    : uploadedFile
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-400 hover:border-gray-400 dark:hover:border-gray-400'
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                {uploadedFile ? (
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mb-4" />
                ) : (
                  <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
                )}

                <div className="space-y-2">
                  {uploadedFile ? (
                    <>
                      <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        File Ready!
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetUpload();
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Change file
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Drop your resume here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        or <span className="underline font-medium text-blue-600 dark:text-blue-400">browse</span> to upload
                      </p>
                      <p className="text-xs text-gray-400">
                        Supports PDF, DOC, DOCX (max 1MB)
                      </p>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>

              {/* Error Display */}
              {processingState.error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700 dark:text-red-400">{processingState.error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!uploadedFile || processingState.isProcessing}
                  className={`
                    px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center space-x-2
                    ${uploadedFile && !processingState.isProcessing
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    }
                  `}
                >
                  {processingState.isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      {/* <ArrowUpOnSquareStackIcon className="h-5 w-5" /> */}
                      <span>Generate Timeline</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instructions */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">How it works:</h3>
                <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                    <span>Upload your latest resume in PDF or Word format</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Our AI analyzes your experience and education chronologically</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Get a beautiful, interactive timeline perfect for portfolios</span>
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Timeline Display */}
          {processingState.isComplete && timelineData && (
            <div className="space-y-8">
              {/* Summary Section */}
              {resumeSummary && (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Career Summary
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Role</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {resumeSummary.currentRole}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Experience</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {resumeSummary.totalExperience}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Education</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {resumeSummary.education}
                        </p>
                      </div>
                      {resumeSummary.keySkills && resumeSummary.keySkills.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Key Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {resumeSummary.keySkills.slice(0, 8).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {resumeSummary.keySkills.length > 8 && (
                              <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                +{resumeSummary.keySkills.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Your Career Timeline
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      Print Timeline
                    </button>
                    <button
                      onClick={resetUpload}
                      className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      Upload New Resume
                    </button>
                  </div>
                </div>
                <Timeline data={timelineData} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <a
              href="https://ui.aceternity.com/components/timeline"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Image
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
                aria-hidden
              />
              <span>Timeline Examples</span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
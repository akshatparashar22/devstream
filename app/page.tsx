import { ArrowUpTrayIcon, ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="row-start-2 flex flex-col gap-10 items-center sm:items-start w-full max-w-xl">

        {/* Drop Catcher */}
        <div className="w-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
          <ArrowUpTrayIcon className="h-8 w-8 text-gray-500 dark:text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Drag and drop your resume here, or{" "}
            <span className="underline font-medium">browse</span>
          </p>
        </div>

        {/* Steps List */}
        <ol className="list-decimal list-inside text-sm sm:text-base text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-0.01em]">
            Upload your latest{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              Resume
            </code>
            .
          </li>
          <li className="tracking-[-0.01em]">
            Get a free, timelined Portfolio. Recruiter Ready.
          </li>
        </ol>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            <ArrowUpOnSquareStackIcon className="h-5 w-5" />
            Upload Now
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          href="https://ui.aceternity.com/components/timeline"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <Image
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
            aria-hidden
          />
          Examples
        </a>
      </footer>
    </div>
  );
}

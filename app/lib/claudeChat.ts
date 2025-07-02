"use server";
import { Anthropic } from "@anthropic-ai/sdk";

export async function chatWithClaude(file: File) {
    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    try {
        // Upload the file
        const uploaded = await client.beta.files.upload({
            file,
        });

        console.log("File uploaded, ID:", uploaded.id);

        const response = await client.beta.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 2048,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please analyze the attached resume and extract a year-based structured timeline in JSON format. 

              The JSON should follow this exact structure:
              {
                "timeline": [
                  {
                    "year": "2024",
                    "title": "Senior Software Engineer",
                    "company": "Tech Corp",
                    "type": "work", // or "education", "certification", "project"
                    "description": "Brief description of role and achievements",
                    "details": [
                      "Key responsibility or achievement 1",
                      "Key responsibility or achievement 2"
                    ],
                    "duration": "Jan 2024 - Present",
                    "location": "City, Country"
                  }
                ],
                "summary": {
                  "totalExperience": "5 years",
                  "currentRole": "Senior Software Engineer",
                  "keySkills": ["React", "Node.js", "Python"],
                  "education": "Bachelor's in Computer Science"
                }
              }

              Instructions:
              1. Extract all work experience, education, certifications, and major projects
              2. Sort entries by year in descending order (most recent first)
              3. Include specific dates when available
              4. Categorize each entry by type (work, education, certification, project)
              5. Extract key skills and technologies mentioned
              6. Provide a brief summary at the end
              7. Only return valid JSON, no additional text

              Make sure the JSON is properly formatted and valid.`
                        },
                        {
                            type: "document",
                            source: {
                                type: "file",
                                file_id: uploaded.id
                            }
                        }
                    ]
                }
            ],
            betas: ["files-api-2025-04-14"],
        });

        // Extract the JSON from Claude's response
        let textContent: string | undefined;

        for (const item of response.content) {
            if (item.type === 'text' && 'text' in item) {
                textContent = item.text;
                break;
            }
        }



        if (textContent) {
            // Try to extract JSON from the response
            const jsonMatch = textContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    const parsedData = JSON.parse(jsonMatch[0]);
                    return parsedData;
                } catch (parseError) {
                    console.error("Error parsing JSON from Claude response:", parseError);
                    console.log("Raw response:", textContent);
                    // Return a fallback structure
                    return {
                        timeline: [],
                        summary: {
                            totalExperience: "N/A",
                            currentRole: "N/A",
                            keySkills: [],
                            education: "N/A"
                        },
                        error: "Failed to parse timeline data"
                    };
                }
            }
        }

        console.log("Full Claude response:", response.content);
        return response.content;

    } catch (err) {
        console.error("Claude API error:", err);
        throw new Error(`Failed to process resume: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}
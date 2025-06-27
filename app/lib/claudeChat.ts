"use server";

import { Anthropic } from "@anthropic-ai/sdk";

export async function chatWithClaude(file: File) {
    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    try {
        // ✅ Upload the actual browser File directly
        const uploaded = await client.beta.files.upload({
            file, // This works because Next.js server actions now support File & Blob
        });

        console.log("File uploaded, ID:", uploaded.id);

        const response = await client.beta.messages.create({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Read the attached resume and extract an year based structured timeline in json format."
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

        return response.content;
    } catch (err) {
        console.error("Claude error:", err);
        throw err;
    }
}

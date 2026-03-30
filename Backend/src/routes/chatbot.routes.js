import { Router } from "express";

const router = Router();

function toSimplePlainText(text) {
    if (!text || typeof text !== "string") return "";

    return text
        .replace(/[*_`#>|~]/g, "")
        .replace(/[\/+-]/g, " ")
        .replace(/\s{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

router.post("/chat", async(req, res) => {
    try {
        const { message, context } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required" });
        }

        // Build context string from farming details
        let contextPrompt = "";
        if (context) {
            const details = [];
            if (context.farmSize) details.push(`Farm Size: ${context.farmSize} acres`);
            if (context.location) details.push(`Location: ${context.location}`);
            if (context.cropType && context.cropType !== "None") details.push(`Crop Type: ${context.cropType}`);
            if (context.season && context.season !== "None") details.push(`Season: ${context.season}`);
            if (context.weather && context.weather !== "None") details.push(`Weather: ${context.weather}`);
            if (context.soilType) details.push(`Soil Type: ${context.soilType}`);

            if (details.length > 0) {
                contextPrompt = `\n\nFarmer's Context:\n${details.join("\n")}`;
            }
        }

        // System prompt for agriculture assistant
        const systemPrompt = `You are an expert agricultural advisor helping Indian farmers. Give very simple and easy answers in plain language. Do not use markdown, bullets, stars, slashes, plus, minus, or special symbols. Keep the answer short, practical, and clear with simple sentences.${contextPrompt}`;

        // Prefer Google Gemini key if provided, otherwise OpenAI
        const openaiKey = process.env.OPENAI_API_KEY;
        const googleKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

        if (!openaiKey && !googleKey) {
            return res.status(500).json({
                error: "API key not configured. Please set OPENAI_API_KEY, GOOGLE_API_KEY, or GEMINI_API_KEY in environment variables."
            });
        }

        let response;

        if (googleKey) {
            response = await fetch(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-goog-api-key": googleKey,
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [
                                { text: systemPrompt },
                                { text: message }
                            ],
                        }, ],
                        generationConfig: {
                            maxOutputTokens: 1024,
                            temperature: 0.3,
                        },
                    }),
                }
            );
        } else {
            response = await fetch(
                "https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openaiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: message }
                        ],
                        temperature: 0.3,
                        max_tokens: 1024,
                    }),
                }
            );
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error("AI API Error:", errorData);
            return res.status(response.status).json({
                error: "Failed to get response from AI service",
                details: errorData
            });
        }

        const data = await response.json();
        let aiResponse;

        if (googleKey) {
            aiResponse =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "I apologize, but I couldn't generate a response. Please try again.";
        } else {
            aiResponse =
                data?.choices?.[0]?.message?.content ||
                "I apologize, but I couldn't generate a response. Please try again.";
        }

        res.json({
            response: toSimplePlainText(aiResponse),
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
            message: error.message
        });
    }
});

export default router;
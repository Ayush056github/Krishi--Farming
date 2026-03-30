import { Router } from "express";

const router = Router();

router.post("/analyze-image", async(req, res) => {
    try {
        const { image, prompt } = req.body;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Check if image is base64 encoded
        if (!image.startsWith("data:image/")) {
            return res.status(400).json({ error: "Invalid image format. Please provide a base64 encoded image." });
        }

        const openaiKey = process.env.OPENAI_API_KEY;
        const googleKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
        if (!openaiKey && !googleKey) {
            return res.status(500).json({
                error: "API key not configured. Please set OPENAI_API_KEY, GOOGLE_API_KEY, or GEMINI_API_KEY in environment variables."
            });
        }

        // Default prompt for agricultural analysis
        const defaultPrompt = `Analyze this agricultural image and provide:
1. A detailed description of the image diseases, pests, crop health.
2. 5 FAQ style Q and A related to this image. Start each question with Q. and each answer with Ans.
3. Advantages and Disadvantages section.
End with: For further information, you can contact krishikisan@gmail.com`;

        const userPrompt = prompt || defaultPrompt;

        let response;
        if (googleKey) {
            const imageData = image.split(",")[1];
            const imageMimeType = image.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/)[1];
            const callGemini = async(modelName) => {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 45000);
                try {
                    return await fetch(
                        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-goog-api-key": googleKey,
                            },
                            signal: controller.signal,
                            body: JSON.stringify({
                                contents: [{
                                    parts: [
                                        { text: userPrompt },
                                        {
                                            inline_data: {
                                                mime_type: imageMimeType,
                                                data: imageData,
                                            },
                                        },
                                    ],
                                }, ],
                                generationConfig: {
                                    temperature: 0.4,
                                    maxOutputTokens: 1400,
                                },
                            }),
                        }
                    );
                } finally {
                    clearTimeout(timeout);
                }
            };

            response = await callGemini("gemini-flash-latest");
            if (!response.ok && (response.status === 503 || response.status === 429)) {
                response = await callGemini("gemini-1.5-flash-latest");
            }
        } else {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 45000);
            try {
                response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${openaiKey}`,
                    },
                    signal: controller.signal,
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [{
                            role: "user",
                            content: [
                                { type: "text", text: userPrompt },
                                { type: "image_url", image_url: { url: image } },
                            ],
                        }, ],
                        max_tokens: 1400,
                    }),
                });
            } finally {
                clearTimeout(timeout);
            }
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error("OpenAI Vision API Error:", errorData);
            return res.status(response.status).json({
                error: "Failed to analyze image",
                details: errorData
            });
        }

        const data = await response.json();
        const analysis = googleKey ?
            data?.candidates?.[0]?.content?.parts?.[0]?.text :
            data?.choices?.[0]?.message?.content;

        res.json({
            analysis: analysis || "I apologize, but I couldn't analyze the image. Please try again.",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Image analysis error:", error);
        if (error.name === "AbortError") {
            return res.status(504).json({
                error: "Image analysis timed out. Please try again once."
            });
        }
        res.status(500).json({
            error: "An error occurred while analyzing the image",
            message: error.message
        });
    }
});

export default router;
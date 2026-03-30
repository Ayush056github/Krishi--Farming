import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());






const fetchWithBackoff = async(url, options, maxRetries = 5) => {
    let delay = 1000;
    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(url, options);


            if (response.status === 429 || response.status >= 500) {
                if (i < maxRetries - 1) {
                    console.warn(`Request failed with status ${response.status}. Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                    continue;
                }
            }
            return response;
        } catch (error) {

            if (i < maxRetries - 1) {
                console.warn(`Network request failed: ${error.message}. Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
                continue;
            }
            throw error;
        }
    }
    throw new Error("API request failed after multiple retries.");
};



app.post("/api/analyze-image", async(req, res) => {
    try {
        const { image, prompt } = req.body;

        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not set." });
        }

        const MODEL = "gemini-2.5-flash-preview-05-20";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;


        const mimeTypeMatch = image.match(/^data:(image\/[a-zA-Z0-9.+]+);base64,/);
        const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "image/jpeg";


        const base64Data = image.replace(/^data:[a-zA-Z0-9\/]+;base64,/, '');

        if (!base64Data) {
            return res.status(400).json({ error: "Invalid image format (base64 data missing)." });
        }


        const payload = {
            contents: [{
                parts: [{
                        text: prompt || "Analyze the agricultural image and describe plant health, disease, and provide concise, actionable recommendations.",
                    },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Data,
                        },
                    },
                ],
            }],
        };


        const response = await fetchWithBackoff(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error.message);
            throw new Error(`Gemini API Error: ${data.error.message}`);
        }

        let analysis = "No analysis found or the model response was empty.";

        if (
            data &&
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0 &&
            data.candidates[0].content.parts[0].text
        ) {
            analysis = data.candidates[0].content.parts[0].text;
        }

    } catch (err) {
        console.error("Error analyzing image:", err);

        res.status(500).json({ error: err.message || "An unexpected internal server error occurred." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
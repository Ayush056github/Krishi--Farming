import { useState, useRef } from "react";
import { useImage } from "../contexts/ImageContext.jsx";

export default function SmartEngine() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { setImage, clearImage } = useImage();

  const compressImageDataUrl = (dataUrl, maxSize = 1280, quality = 0.8) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        const scale = Math.min(maxSize / width, maxSize / height, 1);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Image processing failed"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = dataUrl;
    });

  const analyzeDataUrl = async (dataUrl) => {
    setIsLoading(true);
    setError(null);
    setDescription(null);
    setFaqs([]);

    try {
      const detailedPrompt = `Analyze this agricultural image and provide:

1. A detailed description of the image diseases, pests, crop health. Do not write Detailed Description heading.

2. FAQ Style Questions and Answers
   Provide 5 questions and their answers related to the uploaded image.
   Do not number the questions.
   Each question should start with Q.
   Each answer should start with Ans.

3. Advantages and Disadvantages Section
   After FAQs, add a clearly formatted block comparing the advantages and disadvantages of the crop condition, treatment, or process seen in the image.
   Format it like:
   Advantages:
   - point 1
   - point 2

   Disadvantages:
   - point 1
   - point 2

   End the output with this line exactly:
   For further information, you can contact krishikisan@gmail.com`;

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: dataUrl,
          prompt: detailedPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const analysis = data?.analysis || "I could not analyze the image. Please try again.";
      const lines = analysis.split("\n").filter((line) => line.trim() !== "");
      const faqStart = lines.findIndex((line) => line.trim().toLowerCase().startsWith("q."));

      if (faqStart !== -1) {
        setDescription(lines.slice(0, faqStart).join("\n"));
        const faqLines = lines.slice(faqStart);
        if (!faqLines.some((l) => l.toLowerCase().includes("krishikisan@gmail.com"))) {
          faqLines.push("For further information, you can contact krishikisan@gmail.com");
        }
        setFaqs(faqLines);
      } else {
        setDescription(analysis);
        setFaqs(["For further information, you can contact krishikisan@gmail.com"]);
      }
    } catch (err) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setError(null);
      setDescription(null);
      setFaqs([]);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Result = reader.result;
        const optimizedDataUrl = await compressImageDataUrl(base64Result);
        setImagePreview(optimizedDataUrl);
        const base64Data = optimizedDataUrl.split(",")[1];
        const mimeType = optimizedDataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/)?.[1] || "image/jpeg";
        setImage(file, base64Data, mimeType);
        analyzeDataUrl(optimizedDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setDescription(null);
    setError(null);
    clearImage(); // Clear image from context
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#2d3748", marginBottom: "0.5rem" }}>
            Personalized Advisory Engine
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#718096" }}>
            Dedicated For Our Kerala Farmers — Krishi Kisan (TEST)
          </p>
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.07)", marginBottom: "2rem" }}>
          {!imagePreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{ border: "2px dashed #cbd5e0", borderRadius: "8px", padding: "3rem 2rem", textAlign: "center", cursor: "pointer", background: "#f7fafc" }}
            >
              <h3 style={{ fontSize: "1.2rem", color: "#2d3748", marginBottom: "0.5rem" }}>Click to upload an image</h3>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </div>
          ) : (
            <div>
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <img src={imagePreview} alt="Image Preview" style={{ width: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                <button
                  onClick={handleRemoveImage}
                  style={{ position: "absolute", top: "10px", right: "10px", background: "#060606ff", color: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", cursor: "pointer", fontSize: "1.2rem" }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>

              <button
                onClick={() => imagePreview && analyzeDataUrl(imagePreview)}
                disabled={isLoading}
                style={{ width: "100%", padding: "0.875rem", background: isLoading ? "#7597caffff" : "#0000ff", color: "white", border: "none", borderRadius: "6px", fontSize: "1rem", fontWeight: "600", cursor: isLoading ? "not-allowed" : "pointer", transition: "background 0.3s ease" }}
              >
                {isLoading ? "Analyzing Image..." : "Analyze Image"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fc8181", borderRadius: "8px", padding: "1rem", marginBottom: "2rem", color: "#c53030" }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {description && (
          <div style={{ background: "white", borderRadius: "12px", padding: "2rem", boxShadow: "0 4px 6px rgba(0,0,0,0.07)", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Description</h2>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#2d3748", fontSize: "1rem", marginBottom: "1.5rem" }}>
              {description}
            </div>
            {faqs.length > 0 && (
              <div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>FAQs</h3>
                {faqs.map((faq, index) => (
                  <div key={index} style={{ marginBottom: "1rem", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
                    {faq}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

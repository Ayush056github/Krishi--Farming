import { useEffect, useRef, useState } from "react";
import { useImage } from "../contexts/ImageContext.jsx";

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hey there🌻 \nHow can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const listRef = useRef(null);
    const analyzedImageRef = useRef(null); 
    const { imageBase64, imageMimeType, shouldOpenChatbot, setShouldOpenChatbot, uploadedImage } = useImage();

 
    useEffect(() => {
        if (!imageBase64) {
            analyzedImageRef.current = null;
        }
    }, [imageBase64]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

   
    useEffect(() => {
        if (shouldOpenChatbot && imageBase64) {
            setIsOpen(true);
            setShouldOpenChatbot(false);

            if (analyzedImageRef.current === imageBase64) {
                return;
            }
            analyzedImageRef.current = imageBase64;

            const analyzeImage = async () => {
                setIsLoading(true);
                setMessages([
                    { role: "assistant", content: "Image received. Analyzing now..." },
                ]);
                try {
                    const response = await fetch("/api/analyze-image", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            image: `data:${imageMimeType};base64,${imageBase64}`,
                            prompt: "Give very short and simple image analysis for farmer in plain text.",
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.error || `Server error ${response.status}`);
                    }

                    const data = await response.json();
                    const analysis =
                        data?.analysis ||
                        "I've analyzed your image. What would you like to know about it?";

                    setMessages([
                        { role: "assistant", content: "Hey there🌻 \nI see you've uploaded an image!" },
                        { role: "assistant", content: analysis },
                        {
                            role: "assistant",
                            content:
                                "You can ask me specific questions about any plant, disease, or aspect of the image you'd like to know more about!",
                        },
                    ]);
                } catch (err) {
                    setMessages([
                        { role: "assistant", content: "Hey there🌻 \nI see you've uploaded an image!" },
                        { role: "assistant", content: "Feel free to ask me any questions about what's in the image!" },
                    ]);
                } finally {
                    setIsLoading(false);
                }
            };

            analyzeImage();
        }
    }, [shouldOpenChatbot, imageBase64, imageMimeType, setShouldOpenChatbot]);

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    async function send() {
        const text = input.trim();
        if (!text || isLoading) return;

        const userMsg = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            if (imageBase64) {
                const response = await fetch("/api/analyze-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: `data:${imageMimeType};base64,${imageBase64}`,
                        prompt: text,
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error ${response.status}`);
                }

                const data = await response.json();
                const botText =
                    data?.analysis ||
                    "Unable to process your question right now. Please try again.";

                setMessages((prev) => [...prev, { role: "assistant", content: botText }]);
            } else {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: text,
                        context: {},
                    }),
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `Server error ${response.status}`);
                }

                const data = await response.json();
                const botText = data?.response || "I couldn't generate a reply. Please try again.";
                setMessages((prev) => [...prev, { role: "assistant", content: botText }]);
            }
        } catch (err) {
            setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {!isOpen && (
                <button
                    type="button"
                    className="chatbot-fab"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open Chatbot"
                >
                    <span className="chatbot-fab-icon">
                        <img
                            src="https://www.svgrepo.com/show/474732/assistant.svg"
                            alt="Chatbot"
                            style={{ width: "40px", height: "40px" }}
                        />
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="chatbot-popup" role="dialog" aria-label="Chatbot">
                    <header className="chatbot-header">
                        <div className="chatbot-title">
                            <span className="chatbot-avatar">🤖</span>
                            <span>Chatbot</span>
                        </div>
                        <button
                            type="button"
                            className="chatbot-minimize"
                            onClick={() => setIsOpen(false)}
                            aria-label="Minimize"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z"/></svg>
                        </button>
                    </header>

                    <div ref={listRef} className="chatbot-body">
                        {messages.map((m, i) => (
                            <div key={i} className={`cb-msg ${m.role}`}>
                                <div className="cb-bubble">{m.content}</div>
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-input">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message..."
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className="cb-send"
                            onClick={send}
                            aria-label="Send"
                            disabled={isLoading}
                        >
                            {isLoading ? "🌱" : "➤"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

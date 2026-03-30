import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
    const [form, setForm] = useState({
        farmSize: "",
        location: "",
        cropType: "",
        season: "",
        weather: "",
        soilType: ""
    });
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm your agricultural advisor. Ask me anything about farming?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function setSoil(type) {
        setForm((prev) => ({ ...prev, soilType: type }));
    }

    
    function sanitizeText(text) {
        return text.replace(/[^a-zA-Z0-9 .,?'"!()\n-]/g, '');
    }

    async function send() {
        const text = input.trim();
        if (!text || isLoading) return;

        const userMsg = { role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: text,
                    context: form,
                }),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Server error ${response.status}`);
            }

            const data = await response.json();
            const botText = data?.response || "I could not generate a reply. Please try again.";

            setMessages((prev) => [...prev, { role: "assistant", content: botText }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: sanitizeText(`Error: ${error.message}.`) },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    }

    return (
        <main className="page">
            <div className="container">
                <div className="chat-layout">
                    <section className="context-card">
                        <div className="context-header">
                            <span className="context-icon">🌿</span>
                            <div>
                                <h3 className="context-title">Agriculture Overview</h3>
                                <p className="context-sub">Provide these details for personalized advice.</p>
                            </div>
                        </div>

                        <div className="context-grid">
                            <div className="field">
                                <label>Farm Size (in acres)</label>
                                <input
                                    className="input"
                                    name="farmSize"
                                    placeholder="e.g., 5"
                                    value={form.farmSize}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="field">
                                <label>Location (City/District)</label>
                                <input
                                    className="input"
                                    name="location"
                                    placeholder="e.g., Palakkad"
                                    value={form.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="field">
                                <label>Crop Type</label>
                                <select
                                    className="input"
                                    name="cropType"
                                    value={form.cropType}
                                    onChange={handleChange}
                                >
                                    <option>None</option>
                                    <option>Wheat</option>
                                    <option>Rice</option>
                                    <option>Maize</option>
                                    <option>Sugarcane</option>
                                    <option>Pulses</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Season</label>
                                <select
                                    className="input"
                                    name="season"
                                    value={form.season}
                                    onChange={handleChange}
                                >
                                    <option>None</option>
                                    <option>Kharif</option>
                                    <option>Rabi</option>
                                    <option>Zaid</option>
                                    <option>All Season</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Weather Conditions</label>
                                <select
                                    className="input"
                                    name="weather"
                                    value={form.weather}
                                    onChange={handleChange}
                                >
                                    <option>None</option>
                                    <option>Rainy</option>
                                    <option>Sunny</option>
                                    <option>Cloudy</option>
                                    <option>Humid</option>
                                    <option>Dry</option>
                                </select>
                            </div>
                        </div>

                        <div className="soil">
                            <label>Soil Type</label>
                            <div className="soil-grid">
                                {["Alluvial", "Black", "Red", "Laterite"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`soil-tile ${form.soilType === type ? "active" : ""}`}
                                        onClick={() => setSoil(type)}
                                    >
                                        <img
                                            alt={type}
                                            src={
                                                type === "Alluvial"
                                                    ? "https://5.imimg.com/data5/SELLER/Default/2023/12/365720287/WR/IA/GJ/46402544/brown-alluvium-soil.jpg"
                                                    : type === "Black"
                                                    ? "https://www.shutterstock.com/image-photo/young-plant-growth-spouts-on-600nw-2510787593.jpg"
                                                    : type === "Red"
                                                    ? "https://images.unsplash.com/photo-1532045240594-673a03748f67?fm=jpg&q=60&w=3000"
                                                    : "https://t3.ftcdn.net/jpg/11/71/59/44/360_F_1171594482_qmXLxBEsgUXcsvAfmpKC9eQc6n9chISC.jpg"
                                            }
                                        />
                                        <span>{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="chat-panel">
                        <div ref={listRef} className="chat-messages">
                            {messages.map((m, i) => (
                                <div key={i} className={`msg ${m.role}`}>
                                    <div className="bubble">{m.content}</div>
                                </div>
                            ))}
                        </div>

                        <div className="chat-input">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your question here..."
                                disabled={isLoading}
                            />
                            <div className="ci-actions">
                                <button
                                    type="button"
                                    className="send-btn"
                                    onClick={send}
                                    aria-label="Send"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "..." : "➤"}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

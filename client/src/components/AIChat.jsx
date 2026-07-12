import { useState } from "react";
import axios from "axios";

export default function AIChat() {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "👋 Hi! I'm API Guardian AI. Ask me anything about your backend.",
        },
    ]);

    async function sendMessage() {
        if (!question.trim()) return;

        const userMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {
            const API = import.meta.env.VITE_API_URL;
            const res = await axios.post(
                `${API}/api/ai/chat`,
                {
                    message: question,
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.data.reply,
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        }

        setQuestion("");
        setLoading(false);
    }

    return (
        <div className="bg-[#111827] rounded-xl p-6 border border-slate-700">

            <h2 className="text-2xl font-bold mb-5">
                🤖 AI Assistant
            </h2>

            <div className="h-96 overflow-y-auto space-y-4 mb-5">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.role === "user"
                                ? "text-right"
                                : "text-left"
                        }
                    >
                        <div
                            className={`inline-block px-4 py-3 rounded-xl max-w-md ${
                                msg.role === "user"
                                    ? "bg-cyan-600"
                                    : "bg-slate-700"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>

                ))}

            </div>

            <div className="flex gap-3">

                <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask API Guardian..."
                    className="flex-1 bg-slate-800 rounded-lg px-4 py-3 outline-none"
                />

                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-cyan-600 px-6 rounded-lg hover:bg-cyan-500"
                >
                    {loading ? "..." : "Send"}
                </button>

            </div>

        </div>
    );
}
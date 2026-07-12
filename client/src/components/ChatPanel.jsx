import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ChatPanel({ health }) {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋 Hello! Ask me anything about your API health.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(customMessage) {
    const prompt = customMessage || message;

    if (!prompt.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: prompt,
      },
    ]);

    setLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${API}/api/ai/chat`,
        {
          message: prompt,
          health,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "❌ Unable to reach AI service.",
        },
      ]);
    }

    setLoading(false);
    setMessage("");
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-xl">

      {/* Header */}

      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Assistant
      </h2>

      {/* Quick Buttons */}

      <div className="flex flex-wrap gap-3 mb-5">

        <button
          onClick={() => sendMessage("Why is CPU usage high?")}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-600 transition"
        >
          CPU Analysis
        </button>

        <button
          onClick={() => sendMessage("Summarize today's API health")}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-600 transition"
        >
          Health Summary
        </button>

        <button
          onClick={() => sendMessage("Analyze today's incidents")}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-600 transition"
        >
          Incidents
        </button>

        <button
          onClick={() => sendMessage("How can I improve API performance?")}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-600 transition"
        >
          Optimization
        </button>

      </div>

      {/* Chat Messages */}

      <div className="bg-[#111827] rounded-lg p-4 h-72 overflow-y-auto space-y-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] px-4 py-3 rounded-xl whitespace-pre-wrap leading-7 ${
                msg.role === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 border border-slate-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl animate-pulse">

              🤖 Thinking...

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="flex gap-3 mt-5">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask about CPU, latency, logs..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:border-cyan-500"
        />

        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-400 px-8 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}
import { useState, useEffect } from "react";

export default function ChatPrompt({ setChat, sessionId, regressionResult }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const API_URL = "https://api.reglab.cyou/api";

    // === PESAN AWAL OTOMATIS ===
    useEffect(() => {
        setMessages([
            {
                from: "ai",
                text: "Halo! Saya asisten virtual untuk aplikasi regresi linear. Ada yang bisa saya bantu?"
            }
        ]);
    }, []);

    const sendChat = async () => {
        if (!input.trim()) return;
        if (!sessionId) return alert("Anda belum upload data!");

        const userMsg = { from: "user", text: input };
        setMessages(prev => [...prev, userMsg]);

        const res = await fetch(`${API_URL}/chat/ask`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                session_id: sessionId,
                model: regressionResult?.model || "linear",
                question: input
            })
        });

        const json = await res.json();
        const aiMsg = { from: "ai", text: json.answer };
        setMessages(prev => [...prev, aiMsg]);

        setInput("");
    };

    const aiMessage = (msg) => (
        <div className="bg-white max-w-3/4 shadow-[0_2px_8px] shadow-gray-400 p-4 rounded-3xl rounded-bl-sm mr-auto my-3">
            <p className="text-[0.9rem]">{msg}</p>
        </div>
    );

    const userMessage = (msg) => (
        <div className="base-bg-gradient-br text-white max-w-3/4 shadow-[0_2px_8px] shadow-primary p-4 rounded-3xl rounded-br-sm ml-auto my-3">
            <p className="text-[0.9rem]">{msg}</p>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-xl w-96 h-[480px] border-primary border-2 flex flex-col">

            {/* HEADER */}
            <div className="flex gap-2 items-center px-5 py-4 base-bg-gradient-br rounded-t-3xl text-white font-bold text-xl">
                <i className="bi bi-robot" />
                <p>AI Asisten</p>

                <button
                    type="button"
                    className="ml-auto bg-white/30 px-3 py-1 rounded-full text-sm"
                    onClick={() => setChat(false)}
                >
                    X
                </button>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 flex flex-col overflow-y-auto px-5 py-3">
                {messages.map((m, i) => (
                    m.from === "user" ? userMessage(m.text) : aiMessage(m.text)
                ))}
            </div>

            {/* INPUT AREA */}
            <div className="bg-white border-t-2 border-gray-300 p-4 rounded-b-3xl flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Ketik pesan..."
                    className="w-full p-2 rounded-3xl border focus:outline-none"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />

                <button
                    type="button"
                    onClick={sendChat}
                    className="text-white text-xl bg-linear-to-br from-primary to-secondary px-4 py-2 rounded-full hover:from-secondary hover:to-primary transition-colors duration-300 ease-in-out"
                >
                    <i className="bi bi-send-fill" />
                </button>
            </div>

        </div>
    );
}

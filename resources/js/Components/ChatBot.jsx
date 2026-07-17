import { useState, useRef, useEffect } from "react";

const CHAT_API =
    typeof window !== "undefined" && window.PORTFOLIO_CHAT_URL
        ? window.PORTFOLIO_CHAT_URL
        : "/api/chat";

function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hi! I'm JB Dahay's portfolio assistant. Ask me about Fhel's experience, skills, projects, education, or how to get in touch.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (open) scrollToBottom();
    }, [open, messages]);

    const sendMessage = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: text }]);
        setLoading(true);

        const noApi = !CHAT_API || CHAT_API === "";
        if (noApi) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Chat isn't available on this deployment. It works when the site is run with the full Laravel backend.",
                },
            ]);
            setLoading(false);
            return;
        }

        try {
            const { data } = await window.axios.post(CHAT_API, {
                message: text,
            });
            const reply = data?.content;
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: typeof reply === "string" ? reply : "No response.",
                },
            ]);
        } catch (err) {
            const raw =
                err.response?.data?.error ??
                err.response?.data?.message ??
                err.message;
            const message =
                typeof raw === "string"
                    ? raw
                    : "Fhels AI is currently offline due to vercel restriction no backend or API call     -fhel";
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: message },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <div
                className={`portfolio-chat ${open ? "portfolio-chat--open" : ""}`}
            >
                <div className="portfolio-chat__header">
                    <span className="portfolio-chat__title">fhel.ai</span>
                    <button
                        type="button"
                        className="portfolio-chat__close"
                        onClick={() => setOpen(false)}
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                </div>
                <div className="portfolio-chat__messages">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`portfolio-chat__msg portfolio-chat__msg--${msg.role}`}
                        >
                            <div className="portfolio-chat__bubble">
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="portfolio-chat__msg portfolio-chat__msg--assistant">
                            <div className="portfolio-chat__bubble portfolio-chat__typing">
                                Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="portfolio-chat__input-wrap">
                    <input
                        type="text"
                        className="portfolio-chat__input"
                        placeholder="Ask about Fhel..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <button
                        type="button"
                        className="portfolio-chat__send"
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        aria-label="Send"
                    >
                        Send
                    </button>
                </div>
            </div>
            <button
                type="button"
                className="portfolio-chat__toggle"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close chat" : "Open chat"}
                title="Chat with portfolio assistant"
            >
                {open ? "×" : "💬"}
            </button>
        </>
    );
}

export default ChatBot;

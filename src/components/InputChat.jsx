    import React, { useState } from "react";
    import { useChat } from "../context/chatContext";
    import { parseMessage } from "../utils/messageParser";

    const InputBox = () => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { addMessage } = useChat();

    const sendMessage = async () => {
        if (!text.trim() || isLoading) return;

        setIsLoading(true);
        const messageText = text.trim();
        setText("");

        addMessage({ sender: "user", type: "text", content: messageText });

        try {
        const pluginMsg = await parseMessage(messageText);
        addMessage({
            sender: "assistant",
            type: pluginMsg.pluginName ? "plugin" : "text",
            pluginName: pluginMsg.pluginName,
            pluginData: pluginMsg.pluginData,
            content: pluginMsg.content,
        });
        } catch (error) {
        addMessage({
            sender: "assistant",
            type: "text",
            content: "Sorry, something went wrong. Please try again.",
        });
        } finally {
        setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        }
    };

    return (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3 bg-gray-50 rounded-2xl p-3 shadow-sm border border-gray-200">
            
            <div className="flex-1 min-h-[40px] max-h-32 overflow-hidden">
                <textarea
                className="w-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-500 leading-relaxed"
                placeholder="/ plugin name... [ parameter ]"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                style={{
                    minHeight: '24px',
                    height: 'auto',
                    maxHeight: '128px'
                }}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
                disabled={isLoading}
                />
            </div>
            
            <button
                onClick={sendMessage}
                disabled={!text.trim() || isLoading}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                text.trim() && !isLoading
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
                {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                )}
            </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500 text-center">
            Press Enter to send • Shift + Enter for new line
            </div>
        </div>
        </div>
    );
    };

    export default InputBox;
import React, { useEffect, useRef } from "react";
import { useChat } from "../context/chatContext";
import Message from "./Message";
import InputBox from "./InputChat";

const ChatRoom = () => {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
   
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI Assistant BOT</h1>
              <p className="text-sm text-gray-500">Online • Ready to help</p>
            </div>
          </div>
        
          <div className="flex items-center space-x-2">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              {messages.length} messages
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="max-w-4xl mx-auto space-y-1">
          {messages.length === 0 ? (
           
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">Start a conversation</h3>
              <p className="text-gray-500 max-w-md">
                Send a message to begin chatting with the AI assistant. Ask questions, get help, or just have a friendly conversation!
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Ask a question</span>
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">Get help</span>
                <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">Start coding</span>
              </div>
            </div>
          ) : (
           
            <>
              {messages.map((msg, index) => (
                <Message key={msg.id || index} {...msg} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      <InputBox />
    </div>
  );
};

export default ChatRoom;
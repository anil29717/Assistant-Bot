import React from "react";
import { getPluginByName } from "../plugins/plugin.Manager";

const Message = ({ sender, type, content, pluginName, pluginData }) => {
  const plugin = pluginName ? getPluginByName(pluginName) : null;
  const isUser = sender === "user";

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? "flex-row-reverse" : "flex-row"}`}>
    
        <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
            isUser ? "bg-blue-500" : "bg-gray-500"
          }`}>
            {isUser ? "U" : "A"}
          </div>
        </div>
        
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
          isUser 
            ? "bg-blue-500 text-white rounded-br-md" 
            : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
        }`}>
         
          <div className="text-sm leading-relaxed">
            {type === "plugin" && plugin ? plugin.render(pluginData) : content}
          </div>
          
          
          <div className={`absolute top-0 w-3 h-3 ${
            isUser 
              ? "right-0 transform translate-x-1 translate-y-2 bg-blue-500 rotate-45 rounded-br-sm" 
              : "left-0 transform -translate-x-1 translate-y-2 bg-white border-l border-b border-gray-200 rotate-45 rounded-bl-sm"
          }`} />
        </div>
      </div>
    </div>
  );
};

export default Message;
import React from "react";
import { ChatProvider } from "./context/chatContext";
import ChatWindow from "./components/ChatRoom";

function App() {
  return (
    <ChatProvider>
      <ChatWindow />
    </ChatProvider>
  );
}

export default App;

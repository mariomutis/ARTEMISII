
import React, { useState } from 'react';
import FloatingChatButton from './FloatingChatButton.jsx';
import ChatContainer from './ChatContainer.jsx';

export default function ChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ChatContainer isOpen={isOpen} />
      <FloatingChatButton isOpen={isOpen} toggle={toggleChat} />
    </>
  );
}

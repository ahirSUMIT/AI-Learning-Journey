// ChatArea.jsx - Active chat message container with auto-scroll
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatArea({ messages, isStreaming }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="chat-area-container">
      {messages.map((msg, idx) => (
        <MessageBubble key={msg.id || idx} message={msg} />
      ))}
      {isStreaming && (
        <TypingIndicator />
      )}
      <div ref={bottomRef} />
    </div>
  );
}

// TypingIndicator.jsx - Animated dots while AI is thinking/streaming
import React from 'react';
import { Bot } from 'lucide-react';

export default function TypingIndicator() {
  return (
    <div className="message-row ai">
      <div className="avatar-circle ai">
        <Bot size={18} />
      </div>
      <div className="message-bubble ai typing-indicator-row">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
}

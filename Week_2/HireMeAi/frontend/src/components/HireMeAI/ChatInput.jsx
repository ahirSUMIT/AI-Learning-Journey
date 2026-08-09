// ChatInput.jsx - ChatGPT-style prompt input bar
import React, { useState, useRef } from 'react';
import { Send, Square } from 'lucide-react';

export default function ChatInput({ onSendMessage, isStreaming, onStopStream }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isStreaming) return;
    onSendMessage(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-box">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask HireMeAI..."
          rows={1}
          disabled={isStreaming}
        />
        {isStreaming ? (
          <button
            className="send-btn"
            onClick={onStopStream}
            title="Stop generating"
            style={{ background: '#ef4444' }}
          >
            <Square size={16} fill="white" />
          </button>
        ) : (
          <button
            className="send-btn"
            onClick={handleSubmit}
            disabled={!text.trim()}
            title="Send message"
          >
            <Send size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

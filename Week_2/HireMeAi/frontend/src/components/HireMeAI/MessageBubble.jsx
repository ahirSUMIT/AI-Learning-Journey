// MessageBubble.jsx - Render individual message bubble with Markdown support
import React, { useState } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

export default function MessageBubble({ message }) {
  const isUser = message.sender === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderContent = () => {
    if (isUser) {
      return <div>{message.text}</div>;
    }
    const htmlContent = marked.parse(message.text || '');
    return (
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  };

  return (
    <div className={`message-row ${isUser ? 'user' : 'ai'}`}>
      <div className={`avatar-circle ${isUser ? 'user' : 'ai'}`}>
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className={`message-bubble ${isUser ? 'user' : 'ai'}`}>
        {renderContent()}
        {!isUser && message.text && (
          <button
            onClick={handleCopy}
            title="Copy message"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0, 0, 0, 0.2)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />}
          </button>
        )}
      </div>
    </div>
  );
}

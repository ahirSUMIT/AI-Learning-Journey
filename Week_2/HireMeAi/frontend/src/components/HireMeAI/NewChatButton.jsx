// NewChatButton.jsx - Start a fresh HireMeAI session
import React from 'react';
import { Plus } from 'lucide-react';

export default function NewChatButton({ onClick }) {
  return (
    <button className="new-chat-btn" onClick={onClick}>
      <Plus size={18} />
      <span>New Chat</span>
    </button>
  );
}

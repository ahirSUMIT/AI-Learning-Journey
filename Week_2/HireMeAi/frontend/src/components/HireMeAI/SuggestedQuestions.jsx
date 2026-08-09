// SuggestedQuestions.jsx - Quick prompt suggestion cards
import React from 'react';

const SUGGESTIONS = [
  { id: 'ai-journey', icon: '💡', title: 'Tell me about yourself' },
  { id: 'projects', icon: '💡', title: 'Tell me about projects' },
  { id: 'why-hire', icon: '💡', title: 'Why hire Sumit?' },
  { id: 'resume', icon: '💡', title: 'Resume summary' }
];

export default function SuggestedQuestions({ onSelectQuestion }) {
  return (
    <div className="suggested-questions-grid">
      {SUGGESTIONS.map((item) => (
        <button
          key={item.id}
          className="suggestion-card"
          onClick={() => onSelectQuestion(item.title)}
        >
          <span className="suggestion-icon">{item.icon}</span>
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}

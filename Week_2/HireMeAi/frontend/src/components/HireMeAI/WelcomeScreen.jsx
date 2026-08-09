// WelcomeScreen.jsx - Home view when no messages exist in current session
import React from 'react';
import { Bot } from 'lucide-react';
import SuggestedQuestions from './SuggestedQuestions';

export default function WelcomeScreen({ onSelectQuestion }) {
  return (
    <div className="welcome-screen-container">
      <div className="welcome-bot-icon">
        <Bot size={34} color="#ffffff" />
      </div>
      <h1 className="welcome-title">Hi, I'm HireMeAI</h1>
      <p className="welcome-subtitle">
        AI assistant trained on Sumit Raj's resume, experience, and full-stack projects.
      </p>
      <SuggestedQuestions onSelectQuestion={onSelectQuestion} />
    </div>
  );
}

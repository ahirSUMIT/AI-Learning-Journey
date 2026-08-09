// ChatSidebar.jsx - Left navigation panel for HireMeAI
import React from 'react';
import NewChatButton from './NewChatButton';
import ChatHistory from './ChatHistory';

export default function ChatSidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession
}) {
  return (
    <aside className="chat-sidebar">
      <NewChatButton onClick={onNewChat} />
      <ChatHistory
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={onSelectSession}
        onDeleteSession={onDeleteSession}
      />
    </aside>
  );
}

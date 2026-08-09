// ChatHistory.jsx - Display previous conversations in sidebar
import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';

export default function ChatHistory({ sessions, activeSessionId, onSelectSession, onDeleteSession }) {
  if (!sessions || sessions.length === 0) {
    return (
      <div style={{ padding: '16px 8px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
        No previous chats yet
      </div>
    );
  }

  return (
    <div className="chat-history-container">
      <div className="history-section-title">Previous Chats</div>
      {sessions.map((session) => {
        const isActive = session.id === activeSessionId;
        return (
          <div
            key={session.id}
            className={`history-item ${isActive ? 'active' : ''}`}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="history-item-content">
              <MessageSquare size={15} style={{ shrink: 0 }} />
              <span>{session.title || 'New Conversation'}</span>
            </div>
            {onDeleteSession && (
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                title="Delete chat"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

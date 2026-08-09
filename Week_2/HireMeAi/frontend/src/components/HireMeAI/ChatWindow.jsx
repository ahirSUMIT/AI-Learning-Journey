// ChatWindow.jsx - Complete HireMeAI window assembly
import React, { useState, useRef } from 'react';
import { Bot } from 'lucide-react';
import ChatSidebar from './ChatSidebar';
import WelcomeScreen from './WelcomeScreen';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import { sendMessageStream } from './api';
import './chat.css';

export default function ChatWindow({ onClose, onMinimize, onMaximize }) {
  const [sessions, setSessions] = useState([
    {
      id: 'session-1',
      title: 'New Conversation',
      messages: []
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  // Create new chat session
  const handleNewChat = () => {
    if (isStreaming) handleStopStream();
    const newId = `session-${Date.now()}`;
    const newSession = {
      id: newId,
      title: 'New Conversation',
      messages: []
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  // Select session from history
  const handleSelectSession = (id) => {
    if (isStreaming) handleStopStream();
    setActiveSessionId(id);
  };

  // Delete session
  const handleDeleteSession = (id) => {
    if (isStreaming && id === activeSessionId) handleStopStream();
    const updated = sessions.filter((s) => s.id !== id);
    if (updated.length === 0) {
      handleNewChat();
    } else {
      setSessions(updated);
      if (activeSessionId === id) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  // Send message & stream response
  const handleSendMessage = async (userText) => {
    if (!userText.trim() || isStreaming) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    // Update active session with user message
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const isFirstMessage = s.messages.length === 0;
          return {
            ...s,
            title: isFirstMessage ? userText.slice(0, 26) + (userText.length > 26 ? '...' : '') : s.title,
            messages: [...s.messages, userMessage]
          };
        }
        return s;
      })
    );

    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const aiMessageId = `msg-ai-${Date.now()}`;
    const targetSessionId = activeSessionId;

    await sendMessageStream({
      message: userText,
      history: activeSession ? activeSession.messages : [],
      signal: abortController.signal,
      onChunk: (chunk, accumulatedText) => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === targetSessionId) {
              const existingIdx = s.messages.findIndex((m) => m.id === aiMessageId);
              if (existingIdx === -1) {
                return {
                  ...s,
                  messages: [
                    ...s.messages,
                    { id: aiMessageId, sender: 'ai', text: accumulatedText }
                  ]
                };
              } else {
                const newMsgs = [...s.messages];
                newMsgs[existingIdx] = {
                  ...newMsgs[existingIdx],
                  text: accumulatedText
                };
                return {
                  ...s,
                  messages: newMsgs
                };
              }
            }
            return s;
          })
        );
      },
      onDone: (fullText) => {
        setIsStreaming(false);
        abortControllerRef.current = null;
      },
      onError: (err) => {
        console.error('Stream error:', err);
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    });
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  const hasMessages = activeSession && activeSession.messages.length > 0;

  return (
    <div className="hireme-window-container">
      {/* Window Title Bar */}
      <div className="hireme-titlebar">
        <div className="window-dots">
          <span className="dot dot-close" onClick={onClose} title="Close window" />
          <span className="dot dot-minimize" onClick={onMinimize} title="Minimize window" />
          <span className="dot dot-maximize" onClick={onMaximize} title="Maximize window" />
        </div>
        <div className="window-title">
          <Bot size={16} color="#60a5fa" />
          <span>HireMeAI</span>
        </div>
        <div style={{ width: '40px' }} /> {/* Spacer */}
      </div>

      {/* Main Split Layout */}
      <div className="hireme-main-layout">
        <ChatSidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
        />

        <main className="chat-content-pane">
          {!hasMessages ? (
            <WelcomeScreen onSelectQuestion={handleSendMessage} />
          ) : (
            <ChatArea
              messages={activeSession.messages}
              isStreaming={isStreaming && activeSession.messages[activeSession.messages.length - 1]?.sender === 'user'}
            />
          )}

          <ChatInput
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
            onStopStream={handleStopStream}
          />
        </main>
      </div>
    </div>
  );
}

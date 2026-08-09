// TerminalApp.jsx - Interactive macOS Terminal CLI App
import React, { useState, useRef, useEffect } from 'react';

export default function TerminalApp() {
  const [history, setHistory] = useState([
    { text: 'Last login: Sun Aug  9 15:30:00 on ttys000', type: 'system' },
    { text: 'Type "help" to list available commands.', type: 'system' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newEntry = { text: `sumit@macbook-pro ~ % ${cmd}`, type: 'input' };

    let outputText = '';
    if (trimmed === 'help') {
      outputText = 'Available commands:\n  whoami   - Display bio\n  skills   - List technical skills\n  projects - Show top projects\n  contact  - Get contact links\n  clear    - Clear terminal screen';
    } else if (trimmed === 'whoami') {
      outputText = 'Sumit Raj — Full-Stack & AI Engineer skilled in React, FastAPI, Python, and Generative AI.';
    } else if (trimmed === 'skills') {
      outputText = 'Frontend: React, Tailwind, Next.js, Glassmorphic UI\nBackend: Python, FastAPI, Node.js, REST/SSE\nAI/ML: PyTorch, LangChain, LLM streaming, NLP';
    } else if (trimmed === 'projects') {
      outputText = '1. HireMeAI — Recruiter AI Desktop Portfolio\n2. Autonomous Code Agent OS\n3. Vision Analytics Dashboard\n4. Smart Resume NLP Parser';
    } else if (trimmed === 'contact') {
      outputText = 'Email: sumitraj@example.com\nGitHub: github.com/sumitraj\nLinkedIn: linkedin.com/in/sumitraj';
    } else if (trimmed === 'clear') {
      setHistory([]);
      return;
    } else if (trimmed === '') {
      setHistory((prev) => [...prev, newEntry]);
      return;
    } else {
      outputText = `zsh: command not found: ${cmd}. Type "help" for a list of commands.`;
    }

    setHistory((prev) => [...prev, newEntry, { text: outputText, type: 'output' }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-body" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="terminal-logs">
        {history.map((item, idx) => (
          <pre key={idx} className={`terminal-line ${item.type}`}>
            {item.text}
          </pre>
        ))}
        <div className="terminal-prompt-line">
          <span className="prompt-label">sumit@macbook-pro ~ %</span>
          <input
            id="term-input"
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

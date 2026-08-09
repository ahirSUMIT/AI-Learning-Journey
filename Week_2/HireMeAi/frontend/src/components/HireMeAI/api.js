// api.js - HireMeAI API integration & intelligent streaming engine

const BACKEND_URL = "http://127.0.0.1:8000/chat-stream";

// Comprehensive Knowledge Base for Sumit Raj
const KNOWLEDGE_BASE = {
  projects: `### 🚀 Featured Projects by Sumit Raj

1. **HireMeAI — AI Recruiter Desktop App**
   - **Tech Stack**: React, FastAPI, Tailwind CSS, SSE Streaming, LLMs.
   - **Highlights**: macOS windowed interface, real-time chunk streaming responses, resume intelligence system, and interactive project breakdown.

2. **Autonomous Agent OS**
   - **Tech Stack**: Python, LangChain/LangGraph, PyTorch, React, WebSockets.
   - **Highlights**: Multi-agent framework capable of planning, file generation, subagent delegation, and automated error diagnostics.

3. **Vision Analytics Dashboard**
   - **Tech Stack**: Python, OpenCV, FastAPI, React, Chart.js.
   - **Highlights**: High-throughput object detection and real-time streaming analytics dashboard over WebSockets.

4. **Smart Resume Parser & Matcher**
   - **Tech Stack**: Python, SpaCy, Transformers, PostgreSQL.
   - **Highlights**: Automatic PDF resume skill extraction, entity recognition, and candidate job relevance scoring.`,

  whyHire: `### 🎯 Why Hire Sumit Raj?

- **Full-Stack & AI Mastery**: Seamlessly bridges complex AI algorithms (LLMs, RAG, multi-agents) with ultra-polished modern user interfaces (React, Tailwind, macOS Glassmorphism design).
- **Recruiter-Ready Execution**: Builds complete, production-grade applications with extreme attention to detail, robust error handling, and high performance.
- **Speed & Problem Solving**: Fast execution cycle, clean modular code structure, and deep technical curiosity.
- **Backend & System Design**: Proficient in Python (FastAPI, Flask) and Node.js, designing scalable REST/WebSocket/SSE APIs.`,

  resumeSummary: `### 📄 Resume Summary — Sumit Raj

- **Role**: Full-Stack & AI Engineer
- **Core Skills**:
  - **Frontend**: React, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Next.js, UI/UX Glassmorphism.
  - **Backend**: Python, FastAPI, Flask, Node.js, RESTful APIs, WebSockets, Server-Sent Events (SSE).
  - **AI & ML**: LLM Integration, RAG Pipelines, Prompt Engineering, PyTorch, OpenCV, NLP.
  - **Database & Tools**: PostgreSQL, MongoDB, Git, Docker, Vite, Linux.
- **Focus**: Building intelligent, interactive applications that solve real-world problems with exceptional UI aesthetics.`,

  aiJourney: `### 💡 Sumit's AI Learning & Engineering Journey

1. **Foundations**: Mastered Python, Data Structures, and Machine Learning algorithms.
2. **Web & API Integration**: Built high-speed RESTful & streaming backends using **FastAPI** and Node.js.
3. **Generative AI & LLMs**: Architected conversational agents, RAG (Retrieval-Augmented Generation) pipelines, and prompt optimization strategies.
4. **Modern UI Engineering**: Crafted desktop-grade web applications with React, custom CSS animations, state management, and real-time streaming interfaces.`,

  default: `I am **HireMeAI**, an AI assistant trained on Sumit Raj's resume and portfolio!

I can help you explore:
- 💡 **Projects**: Detailed breakdown of key AI projects & others.
- 💡 **Why Hire Sumit?**: Technical strengths, team value, and capabilities.
- 💡 **Resume Summary**: Tech stack, experience, and domain expertise.
- 💡 **My AI Journey**: Engineering background and AI specialization.

Feel free to ask me anything specific about Sumit's qualifications!`
};

/**
 * Sends a message and streams the AI response back via callbacks.
 * Falls back gracefully to the pre-loaded knowledge base if backend server is unreachable.
 */
export async function sendMessageStream({ message, history = [], onChunk, onDone, onError, signal }) {
  const lowerMsg = message.toLowerCase();

  try {
    // Attempt backend call first if FastAPI is running
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message, message: message, history }),
      signal
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        if (onChunk) onChunk(chunk, fullText);
      }

      if (onDone) onDone(fullText);
      return;
    }
  } catch (err) {
    if (err?.name === 'AbortError') {
      if (onDone) onDone("");
      return;
    }
    // Network or HTTP error -> use client-side response engine fallback
    console.log("Using client-side response engine fallback due to:", err?.message || err);
  }

  // Client-Side Simulated Streaming Response Engine
  let responseText = KNOWLEDGE_BASE.default;

  if (lowerMsg.includes("project") || lowerMsg.includes("work") || lowerMsg.includes("build")) {
    responseText = KNOWLEDGE_BASE.projects;
  } else if (lowerMsg.includes("why hire") || lowerMsg.includes("hire sumit") || lowerMsg.includes("recruit")) {
    responseText = KNOWLEDGE_BASE.whyHire;
  } else if (lowerMsg.includes("resume") || lowerMsg.includes("summary") || lowerMsg.includes("skill") || lowerMsg.includes("tech stack")) {
    responseText = KNOWLEDGE_BASE.resumeSummary;
  } else if (lowerMsg.includes("ai") || lowerMsg.includes("journey") || lowerMsg.includes("learning") || lowerMsg.includes("ml")) {
    responseText = KNOWLEDGE_BASE.aiJourney;
  } else {
    // Generative template answer
    responseText = `Thanks for asking about **"${message}"**!\n\n` + KNOWLEDGE_BASE.default;
  }

  // Stream text word-by-word with delay
  const words = responseText.split(" ");
  let accumulated = "";

  for (let i = 0; i < words.length; i++) {
    if (signal && signal.aborted) {
      break;
    }
    const word = words[i] + (i === words.length - 1 ? "" : " ");
    accumulated += word;
    if (onChunk) onChunk(word, accumulated);
    // Small natural streaming delay (20ms per word)
    await new Promise((res) => setTimeout(res, 20));
  }

  if (onDone) onDone(accumulated);
}

// ResumeApp.jsx - Interactive Resume Viewer App
import React, { useState } from 'react';
import { Download, Briefcase, Award, Code, Mail, Phone, MapPin } from 'lucide-react';

export default function ResumeApp() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <div className="app-window-body">
      <div className="resume-hero">
        <div className="resume-profile-header">
          <div>
            <h1>Sumit Raj</h1>
            <p className="subtitle">Full-Stack & AI Engineer</p>
            <div className="contact-line">
              <span><MapPin size={13} /> India</span>
              <span>•</span>
              <span><Mail size={13} /> sumitraj@example.com</span>
            </div>
          </div>
          <button className="download-resume-btn" onClick={() => alert('Downloading Sumit_Raj_Resume.pdf')}>
            <Download size={15} /> Download PDF
          </button>
        </div>

        <div className="resume-tabs">
          <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            <Code size={14} /> Skills Overview
          </button>
          <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => setActiveTab('experience')}>
            <Briefcase size={14} /> Experience
          </button>
        </div>
      </div>

      <div className="resume-content-area">
        {activeTab === 'skills' && (
          <div className="skills-section-grid">
            <div className="skill-card">
              <h3>Frontend & Design</h3>
              <p>React, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Glassmorphism UI, Next.js, Vite, Responsive Layouts.</p>
            </div>
            <div className="skill-card">
              <h3>Backend & API Systems</h3>
              <p>Python, FastAPI, Flask, Node.js, Express, REST APIs, Server-Sent Events (SSE), WebSockets, Microservices.</p>
            </div>
            <div className="skill-card">
              <h3>AI & Machine Learning</h3>
              <p>LLM Integration, Prompt Engineering, LangChain, PyTorch, SpaCy, NLP Resume Parsing, RAG Architecture.</p>
            </div>
            <div className="skill-card">
              <h3>Database & Infrastructure</h3>
              <p>PostgreSQL, MongoDB, Docker, Git / GitHub, Linux CLI, AsyncIO, Pytest.</p>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="experience-timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <h4>Full-Stack & AI Engineer</h4>
                  <span className="timeline-date">2023 - Present</span>
                </div>
                <p className="company-name">Autonomous Tech Systems</p>
                <ul>
                  <li>Architected HireMeAI portfolio and AI recruitment assistant with real-time SSE streaming backend in FastAPI.</li>
                  <li>Engineered multi-agent automation tools improving code verification velocity by 40%.</li>
                  <li>Built responsive React frontends with modern glassmorphic desktop interface design.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

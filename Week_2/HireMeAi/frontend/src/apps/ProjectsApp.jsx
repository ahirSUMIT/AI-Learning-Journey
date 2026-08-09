// ProjectsApp.jsx - Projects Showcase macOS Window App
import React, { useState } from 'react';
import { ExternalLink, GitBranch, Code, Sparkles } from 'lucide-react';

const PROJECTS = [
  {
    id: 'hireme-ai',
    title: 'HireMeAI — AI Recruiter Portfolio Desktop',
    category: 'AI & ML',
    description: 'macOS desktop environment featuring real-time SSE streaming, ChatGPT-style sidebar history, zero-scroll home screen, and resume-trained AI response engine.',
    tags: ['React', 'FastAPI', 'SSE Streaming', 'Tailwind CSS', 'Python'],
    github: 'https://github.com/sumitraj/hireme-ai',
    demo: '#'
  },
  {
    id: 'autonomous-agent',
    title: 'Autonomous Code Agent OS',
    category: 'AI & ML',
    description: 'Multi-agent orchestration framework equipped with automated planning, subagent execution trees, code generation, and empirical runtime verification.',
    tags: ['Python', 'LangChain', 'PyTorch', 'WebSockets', 'React'],
    github: 'https://github.com/sumitraj/autonomous-agent-os',
    demo: '#'
  },
  {
    id: 'vision-analytics',
    title: 'Vision Analytics Dashboard',
    category: 'Full-Stack',
    description: 'Real-time computer vision stream processor with object recognition, heatmap tracking, and continuous data push over WebSockets.',
    tags: ['FastAPI', 'OpenCV', 'React', 'Chart.js', 'Docker'],
    github: 'https://github.com/sumitraj/vision-analytics',
    demo: '#'
  },
  {
    id: 'resume-parser',
    title: 'Smart Resume NLP Parser & Matcher',
    category: 'Full-Stack',
    description: 'Automated candidate screening tool parsing PDF resumes, extracting entities, indexing skills, and scoring candidate relevance.',
    tags: ['Python', 'SpaCy', 'Transformers', 'PostgreSQL'],
    github: 'https://github.com/sumitraj/resume-parser-nlp',
    demo: '#'
  }
];

export default function ProjectsApp() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="app-window-body">
      <div className="app-window-header">
        <h2>
          <Sparkles size={20} color="#60a5fa" />
          <span>Sumit's Featured Projects</span>
        </h2>
        <div className="filter-pills">
          {['All', 'Full-Stack', 'AI & ML'].map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <h3>{project.title}</h3>
              <span className="category-badge">{project.category}</span>
            </div>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
            <div className="project-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="action-btn">
                <GitBranch size={14} /> Code
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

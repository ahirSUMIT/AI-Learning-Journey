// App.jsx - Sumit's Portfolio Desktop Application
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/HireMeAI/ChatWindow';

export default function App() {
  const [activeWin, setActiveWin] = useState(null); // 'win-hireme', 'win-projects', 'win-resume', 'win-about', 'win-contact'
  const [time, setTime] = useState('');

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const opts = { weekday: 'short', month: 'short', day: 'numeric' };
      const dateStr = now.toLocaleDateString('en-US', opts);
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${dateStr} · ${h}:${m} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWin = (id) => setActiveWin(id);
  const closeWin = () => setActiveWin(null);

  return (
    <div>
      {/* WALLPAPER */}
      <div className="wallpaper">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,650 C300,500 500,850 900,600 C1200,420 1400,700 1700,500 L1700,1100 L-100,1100 Z" fill="rgba(255,255,255,0.06)"/>
          <path d="M-100,750 C350,600 600,950 950,700 C1250,500 1450,780 1700,600 L1700,1100 L-100,1100 Z" fill="rgba(255,255,255,0.09)"/>
        </svg>
      </div>
      <div className="grain"></div>

      {/* MENU BAR */}
      <div className="menubar">
        <div className="left">
          <span className="apple-mark">◆</span>
          <span className="brand">Sumit's Portfolio</span>
          <span onClick={() => openWin('win-hireme')}>Projects</span>
          <span onClick={() => openWin('win-contact')}>Contact</span>
          <span onClick={() => openWin('win-resume')}>Resume</span>
        </div>
        <div className="right">
          <span>📶</span>
          <span>🔍</span>
          <span>{time}</span>
        </div>
      </div>

      {/* DESKTOP ICONS */}
      <div className="desktop-icons">
        <div className="dicon" onDoubleClick={() => openWin('win-hireme')} onClick={() => openWin('win-hireme')}>
          <div className="glyph folder-glyph">🗂️</div>
          <div className="label">HireMeAI</div>
        </div>
        <div className="dicon" onDoubleClick={() => openWin('win-resume')} onClick={() => openWin('win-resume')}>
          <div className="glyph pdf-glyph">📄</div>
          <div className="label">Resume.pdf</div>
        </div>
        <div className="dicon" onDoubleClick={() => openWin('win-about')} onClick={() => openWin('win-about')}>
          <div className="glyph about-glyph">🙋</div>
          <div className="label">About Me</div>
        </div>
        <div className="dicon" onDoubleClick={() => openWin('win-projects')} onClick={() => openWin('win-projects')}>
          <div className="glyph folder-glyph">🗂️</div>
          <div className="label">Other Projects</div>
        </div>
        <div className="dicon" onDoubleClick={() => openWin('win-contact')} onClick={() => openWin('win-contact')}>
          <div className="glyph contact-glyph">✉️</div>
          <div className="label">Contact</div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="eyebrow">Hey, I'm Sumit! welcome to my</div>
        <h1>PORTFOLIO</h1>
        <div className="sub">
          I'm an AI assistant trained on Sumit Raj's resume, projects, technical skills and AI learning journey. Feel free to interview me exactly as you would interview.
        </div>
      </div>

      {/* DOCK */}
      <div className="dock-wrap">
        <div className="dock">
          <button className="dock-item finder" title="About" onClick={() => openWin('win-about')}>🙋</button>
          <button className="dock-item projects" title="Projects" onClick={() => openWin('win-hireme')}>🗂️</button>
          <button className="dock-item mail" title="Contact" onClick={() => openWin('win-contact')}>✉️</button>
          <button className="dock-item terminal" title="Resume" onClick={() => openWin('win-resume')}>&gt;_</button>
          <button className="dock-item ask" title="Ask Me" onClick={() => openWin('win-hireme')}>✨ <span className="txt">Ask Me</span></button>
        </div>
      </div>

      {/* WINDOW OVERLAY: HireMeAI Chat System */}
      <div className={`win-overlay ${activeWin === 'win-hireme' ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}>
        <div className="window" style={{ width: 'min(1060px, 95vw)', height: 'min(700px, 90vh)', padding: 0 }}>
          <ChatWindow
            onClose={closeWin}
            onMinimize={closeWin}
            onMaximize={() => {}}
          />
        </div>
      </div>

      {/* WINDOW OVERLAY: Other Projects */}
      <div className={`win-overlay ${activeWin === 'win-projects' ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}>
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin}></div>
            <div className="traffic yellow"></div>
            <div className="traffic green"></div>
            <div className="wtitle">Other Projects</div>
          </div>
          <div className="wbody">
            <h2>Sign Language Translator</h2>
            <span className="tag">MediaPipe · RandomForest · LSTM · OpenCV</span>
            <p>Real-time sign translator, built in two phases: static alphabet recognition with MediaPipe Hands + RandomForest, and dynamic word-level signs with MediaPipe Holistic + an LSTM sequence model.</p>

            <h2 style={{ marginTop: '22px' }}>AI Resume Screening Pipeline</h2>
            <span className="tag">Prompt Chaining · Groq · Pydantic</span>
            <p>A 3-step LLM pipeline — extract resume, extract job description, then score the match — returning a structured 0–100 fit score with reasoning for each candidate.</p>

            <h2 style={{ marginTop: '22px' }}>Blockchain-Based Voting System</h2>
            <span className="tag">Capstone Project · Team of 4</span>
            <p>A secure, tamper-evident voting platform built on blockchain, supervised by Dr. Prashant Chaudhary. Delivered as a full IEEE-format synopsis with a working prototype.</p>
            <div className="links">
              <a
                className="btn ghost"
                href="https://github.com/ahirSUMIT"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗ GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WINDOW OVERLAY: Resume */}
      <div
        className={`win-overlay ${activeWin === 'win-resume' ? 'show' : ''}`}
        onClick={(e) =>
          e.target.classList.contains('win-overlay') && closeWin()
        }
      >
        <div
          className="window"
          style={{
            width: "min(1000px,95vw)",
            height: "min(90vh,900px)",
            padding: 0
          }}
        >
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin}></div>
            <div className="traffic yellow"></div>
            <div className="traffic green"></div>

            <div className="wtitle">Resume.pdf</div>
              <a
                href="/resume.pdf"
                download
                style={{
                  marginLeft: "auto",
                  marginRight: "20px",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600"
                }}
              >
                ⬇ Download
              </a>
          </div>

          <iframe
            src="/resume.pdf"
            title="Resume"
            width="100%"
            height="100%"
            style={{
              border: "none",
              borderBottomLeftRadius: "14px",
              borderBottomRightRadius: "14px",
              background: "#fff"
            }}
          />
        </div>
      </div>

      {/* WINDOW OVERLAY: About Me */}
      <div className={`win-overlay ${activeWin === 'win-about' ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}>
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin}></div>
            <div className="traffic yellow"></div>
            <div className="traffic green"></div>
            <div className="wtitle">About Me</div>
          </div>
          <div className="wbody">
            <h2>Hey, I'm Sumit 👋</h2>
            <p>I'm a final-year Computer Science student in Dehradun, building my way into AI engineering one project at a time. I care more about shipping working systems than reading about them — every week of my AI course turns into a real project, tracked on GitHub and shared on LinkedIn.</p>
              <p>
                My goal is straightforward: become an AI engineer who can take a model
                from an API call to a shipped, working product — and I'm building that
                track record one project at a time.
              </p>
            <p>Right now I'm deep in building <strong>HireMeAI</strong>, a resume intelligence platform, alongside a real-time sign language translator and a string of prompt-engineering and agentic AI experiments.</p>
            <p>Background: MERN full-stack development, DSA in Java, and a blockchain-based voting system as my final-year capstone.</p>
            <div className="stack">
              <span className="chip">AI Engineering</span><span className="chip">Full-Stack Dev</span><span className="chip">Data Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* WINDOW OVERLAY: Contact */}
      <div className={`win-overlay ${activeWin === 'win-contact' ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}>
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin}></div>
            <div className="traffic yellow"></div>
            <div className="traffic green"></div>
            <div className="wtitle">Contact</div>
          </div>
          <div className="wbody">
            <h2>Let's talk</h2>
            <p>Open to internships, AI engineering roles, and collaboration on interesting projects.</p>
            <div className="about-grid">
              <div className="about-card">
                <div className="k">Email</div>
                <div className="v">
                  <a href="mailto:ahirsumit0145@gmail.com">
                    ahirsumit0145@gmail.com
                  </a>
                </div>
              </div>

              <div className="about-card">
                <div className="k">LinkedIn</div>
                <div className="v">
                  <a
                    href="https://www.linkedin.com/in/sumit-raj-803888412"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/sumit-raj-803888412
                  </a>
                </div>
              </div>

              <div className="about-card">
                <div className="k">GitHub</div>
                <div className="v">
                  <a
                    href="https://github.com/ahirSUMIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/ahirSUMIT
                  </a>
                </div>
              </div>
              <div className="about-card"><div className="k">Location</div><div className="v">Gaya jee, Bihar, India</div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

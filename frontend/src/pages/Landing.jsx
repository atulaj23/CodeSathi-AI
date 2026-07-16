import { Link } from "react-router-dom";
import AIAvatar from "../components/AIAvatar";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">

      {/* Aurora Background */}

      <div className="aurora">
        <span className="orb orb-a"></span>
        <span className="orb orb-b"></span>
        <span className="orb orb-c"></span>
      </div>

      {/* Grid */}

      <div className="grid-bg"></div>

      {/* Navigation */}

      <nav className="landing-nav">

        <div className="brand">

          <div className="brand-logo">
            ⚡
          </div>

          <div>

            <h2>CodeSathi AI</h2>

            <small>AI Workspace</small>

          </div>

        </div>

        <div className="nav-links">

          <Link to="/login">
            Login
          </Link>

          <Link
            to="/signup"
            className="nav-start"
          >
            Launch App
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <div className="hero-chip">

            <span className="live-dot"></span>

            AI Workspace v2.0

          </div>

          <h1>

            Build

            <span> Smarter.</span>

            <br />

            Ship

            <span> Faster.</span>

          </h1>

          <p className="hero-text">

            CodeSathi AI is an intelligent workspace for
            developers and healthcare professionals.

            Generate code, debug projects, analyze files,
            understand medical concepts and build products
            from one beautiful AI platform.

          </p>

          <div className="hero-buttons">

            <Link
              to="/signup"
              className="primary-btn"
            >
              Start Free →
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Live Demo
            </Link>

          </div>

          <div className="hero-stats">

            <div className="stat-card">

              <h2>100K+</h2>

              <span>AI Responses</span>

            </div>

            <div className="stat-card">

              <h2>98%</h2>

              <span>Accuracy</span>

            </div>

            <div className="stat-card">

              <h2>24×7</h2>

              <span>Always Ready</span>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="hero-dashboard">

          <div className="dashboard glass">

            <div className="dashboard-top">

              <div className="traffic">

                <span className="red"></span>
                <span className="yellow"></span>
                <span className="green"></span>

              </div>

              <span className="dashboard-title">

                CodeSathi Workspace

              </span>

            </div>

            <AIAvatar />

            <div className="dashboard-card">

              <div>

                🤖 AI Assistant

              </div>

              <span>Online</span>

            </div>

            <div className="dashboard-card">

              <div>

                💻 Coding Mode

              </div>

              <span>Active</span>

            </div>

            <div className="dashboard-card">

              <div>

                🩺 Healthcare

              </div>

              <span>Ready</span>

            </div>

            <button className="dashboard-btn">

              Open Workspace →

            </button>

          </div>

        </div>

      </section>

            {/* FEATURES */}

      <section className="features">

        <div className="section-title">

          <span>POWERFUL FEATURES</span>

          <h2>
            Everything You Need In One AI Platform
          </h2>

          <p>
            Modern tools built for developers, students and professionals.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">💻</div>

            <h3>AI Code Generation</h3>

            <p>
              Generate complete applications in React,
              Node.js, Python, Java, C++, PHP and many
              more languages.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">⚡</div>

            <h3>Instant Debugging</h3>

            <p>
              Find bugs, improve performance and optimize
              your code automatically.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">🧠</div>

            <h3>AI Memory</h3>

            <p>
              Continue previous chats and work on large
              projects without losing context.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">📂</div>

            <h3>File Analysis</h3>

            <p>
              Upload PDF, Images, Excel, CSV, ZIP,
              JavaScript, Python and more.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">🩺</div>

            <h3>Healthcare AI</h3>

            <p>
              Learn medical concepts, diseases,
              medicines and healthcare topics
              with AI assistance.
            </p>

          </div>

          <div className="feature-card">

            <div className="feature-icon">🚀</div>

            <h3>Project Builder</h3>

            <p>
              Build complete full-stack projects,
              APIs and SaaS applications faster.
            </p>

          </div>

        </div>

      </section>

      {/* WHY */}

      <section className="why-section">

        <div className="section-title">

          <span>WHY CODESATHI</span>

          <h2>
            Built For The Next Generation
          </h2>

        </div>

        <div className="why-grid">

          <div className="why-card">

            <h3>⚡ Lightning Fast</h3>

            <p>
              Optimized responses with premium UI.
            </p>

          </div>

          <div className="why-card">

            <h3>🔒 Secure Workspace</h3>

            <p>
              Your conversations stay organized and protected.
            </p>

          </div>

          <div className="why-card">

            <h3>🌍 Multi Purpose</h3>

            <p>
              Coding + Healthcare + AI Productivity
              inside one application.
            </p>

          </div>

        </div>

      </section>


            {/* WORKFLOW */}

      <section className="workflow">

        <div className="section-title">

          <span>WORKFLOW</span>

          <h2>Three Steps To Build Anything</h2>

          <p>
            Simple, fast and powerful AI workflow.
          </p>

        </div>

        <div className="workflow-grid">

          <div className="workflow-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Ask Anything
            </h3>

            <p>
              Type your coding question,
              upload files or ask healthcare
              related queries.
            </p>

          </div>

          <div className="workflow-card">

            <div className="step-number">
              02
            </div>

            <h3>
              AI Understands
            </h3>

            <p>
              CodeSathi AI analyzes your
              request and generates intelligent,
              optimized responses instantly.
            </p>

          </div>

          <div className="workflow-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Build Faster
            </h3>

            <p>
              Copy code, continue chatting,
              improve projects and save hours
              of development time.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-card glass">

          <span className="cta-tag">
            🚀 READY TO START?
          </span>

          <h2>

            Experience The Future Of

            <span> AI Workspace</span>

          </h2>

          <p>

            One platform for Coding,
            Healthcare, Automation,
            Learning and Productivity.

          </p>

          <div className="hero-buttons">

            <Link
              to="/signup"
              className="primary-btn"
            >
              Create Free Account
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Sign In
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="landing-footer">

        <div className="footer-brand">

          <h2>
            ⚡ CodeSathi AI
          </h2>

          <p>
            Build Faster. Learn Smarter.
          </p>

        </div>

        <div className="footer-links">

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Sign Up
          </Link>

          <Link to="/healthcare">
            Healthcare
          </Link>

        </div>

        <div className="footer-copy">

          © 2026 CodeSathi AI.
          All Rights Reserved.

        </div>

      </footer>

    </div>
  );
}
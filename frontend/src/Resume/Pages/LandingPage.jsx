import React, { useState } from "react";
import ReactDOM from "react-dom/client";



/* ============================================================
   HEADER BAR
   ============================================================ */

function Header({ isSignedIn, userName, onOpenSignIn, onOpenCreateAccount, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="letterhead">
        <p className="wordmark">CreateResume.</p>
        <p className="tagline">Curriculum Vitae, Reconsidered</p>
      </div>

      <div className="container nav-row">
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <ul className="nav-links" style={menuOpen ? { display: "flex" } : undefined}>
          <li><a href="#templates">Templates</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>

        <div className="auth-actions">
          {isSignedIn ? (
            <>
              <span className="user-greeting">Signed in as {userName}</span>
              <button className="btn" onClick={onSignOut}>Sign Out</button>
            </>
          ) : (
            <>
              <button className="btn-text" onClick={onOpenSignIn}>Sign In</button>
              <button className="btn btn-solid" onClick={onOpenCreateAccount}>
                Create Account
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function Hero({ onOpenCreateAccount, onOpenSignIn }) {
  return (
    <section className="hero">
      <div className="container">
        <div>
          <p className="eyebrow">Free to start</p>
          <h1 className="hero-heading">
            Put your career
            <br />
            <em>in writing.</em>
          </h1>
          <p className="hero-sub">
            Build a Resume the old-fashioned way: precise, well-typeset, and
            easy to trust. Choose a layout, fill in your history, and export
            a document that reads like it was set by hand.
          </p>
          <div className="hero-cta-row">
            <button className="btn btn-solid btn-large" onClick={onOpenCreateAccount}>
              Create your Resume — free
            </button>
            <span className="signin-hint">
              Already have one?{" "}
              <button className="btn-text" onClick={onOpenSignIn}>Sign in</button>
            </span>
          </div>
        </div>

        <div className="doc-wrap">
          <div className="doc-card">
            <p className="doc-name">JOHN A. DOE</p>
            <p className="doc-role">Software Engineer — Pune, India</p>
            <hr className="doc-rule" />

            <div className="doc-block">
              <p className="doc-section-label">Experience</p>
              <div className="doc-line med"></div>
              <div className="doc-line short"></div>
            </div>

            <div className="doc-block">
              <p className="doc-section-label">Education</p>
              <div className="doc-line med"></div>
              <div className="doc-line short"></div>
            </div>

            <div className="doc-block">
              <p className="doc-section-label">Skills</p>
              <div className="doc-line short"></div>
            </div>

            <div className="stamp">
              <div className="stamp-inner">ATS&nbsp;READY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURES
   ============================================================ */

function Features() {
  const columns = [
    {
      label: "Templates",
      text: "A small set of considered layouts — no clutter, no gimmicks. Each one is built to be read, not decorated.",
    },
    {
      label: "ATS Optimisation",
      text: "Every template exports as clean, parseable text, so applicant tracking systems read your Resume the same way a person would.",
    },
    {
      label: "One-click Export",
      text: "Download a print-ready PDF in seconds, or share a link that always reflects your latest edit.",
    },
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="section-heading">
          Everything a Resume needs. Nothing it doesn't.
        </h2>
        <div className="feature-grid">
          {columns.map((col) => (
            <div className="feature-col" key={col.label}>
              <p className="feature-col-label">{col.label}</p>
              <p>{col.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TEMPLATE SWATCHES
   ============================================================ */

function Templates() {
  const swatches = [
    { title: "Ledger", bars: ["w-90", "w-70", "w-50"] },
    { title: "Broadsheet", bars: ["w-70", "w-90", "w-50"] },
    { title: "Folio", bars: ["w-50", "w-90", "w-70"] },
    { title: "Manuscript", bars: ["w-90", "w-50", "w-70"] },
  ];

  return (
    <section id="templates" className="section">
      <div className="container">
        <h2 className="section-heading">Four layouts, set in the same care.</h2>
        <div className="swatch-grid">
          {swatches.map((s) => (
            <div className="swatch" key={s.title}>
              <p className="swatch-title">{s.title}</p>
              {s.bars.map((w, i) => (
                <div className={`swatch-bar ${w}`} key={i}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CTA BAND
   ============================================================ */

function CtaBand({ onOpenCreateAccount }) {
  return (
    <section className="cta-band">
      <div className="container">
        <p className="eyebrow">No credit card required</p>
        <h2>Ready to put it on paper?</h2>
        <button className="btn btn-large" onClick={onOpenCreateAccount}>
          Create your account
        </button>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <span className="footer-mark">CreateResume.</span>
        <ul className="footer-links">
          <li><a href="#templates">Templates</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <span className="footer-copy">&copy; 2026 CreateResume. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ============================================================
   AUTH MODAL — used for both "Create Account" and "Sign In"
   ============================================================ */

function AuthModal({ mode, onClose, onSubmit, onSwitchMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isCreate = mode === "create";

  function handleSubmit(e) {
    e.preventDefault();
    const displayName = isCreate ? name || email.split("@")[0] : email.split("@")[0];
    onSubmit(displayName || "there");
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <p className="modal-eyebrow">{isCreate ? "New account" : "Welcome back"}</p>
        <h3 className="modal-title">{isCreate ? "Create Account" : "Sign In"}</h3>

        <form onSubmit={handleSubmit}>
          {isCreate && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Smith"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-solid modal-submit">
            {isCreate ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="modal-switch">
          {isCreate ? "Already have an account? " : "Don't have an account? "}
          <button className="btn-text" onClick={() => onSwitchMode(isCreate ? "signin" : "create")}>
            {isCreate ? "Sign in" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   APP — top-level state (auth + modal)
   ============================================================ */

function LandingPage() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [authModal, setAuthModal] = useState(null); // null | "signin" | "create"

  function handleAuthSubmit(name) {
    setUserName(name);
    setIsSignedIn(true);
    setAuthModal(null);
  }

  function handleSignOut() {
    setIsSignedIn(false);
    setUserName("");
  }

  return (
    <>
      <Header
        isSignedIn={isSignedIn}
        userName={userName}
        onOpenSignIn={() => setAuthModal("signin")}
        onOpenCreateAccount={() => setAuthModal("create")}
        onSignOut={handleSignOut}
      />

      <main>
        <Hero
          onOpenCreateAccount={() => setAuthModal("create")}
          onOpenSignIn={() => setAuthModal("signin")}
        />
        <Features />
        <Templates />
        <CtaBand onOpenCreateAccount={() => setAuthModal("create")} />
      </main>

      <Footer />

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSubmit={handleAuthSubmit}
          onSwitchMode={(mode) => setAuthModal(mode)}
        />
      )}
    </>
  );
}

export default LandingPage;



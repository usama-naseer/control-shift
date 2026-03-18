// Navbar.jsx - With mobile hamburger menu

import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
          <div className="navbar-logo-icon">
            <span className="material-symbols-outlined">move_item</span>
          </div>
          <span className="navbar-logo-text">Control Shift</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-nav">
          <a href="#" className="navbar-nav-link">How it Works</a>
          <a href="#" className="navbar-nav-link">Services</a>
          <a href="#" className="navbar-nav-link">Pricing</a>
        </nav>

        {/* Desktop Actions */}
        <div className="navbar-actions">
          <button className="navbar-login-btn">Login</button>
          <button className="navbar-cta-btn" onClick={() => window.location.reload()}>Get Started</button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar-menu-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="navbar-mobile-menu">
          <a href="#" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>How it Works</a>
          <a href="#" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>Pricing</a>
          <div className="navbar-mobile-actions">
            <button className="navbar-login-btn">Login</button>
            <button className="navbar-cta-btn" onClick={() => window.location.reload()}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}

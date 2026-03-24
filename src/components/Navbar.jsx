import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function goHome() {
  // With HashRouter, navigate to #/ then reload to reset all state
  if (window.location.hash === '#/' || window.location.hash === '') {
    window.location.reload();
  } else {
    window.location.hash = '/';
    window.location.reload();
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">

        {/* Logo — always reloads/goes home */}
        <a className="navbar-logo" onClick={(e) => { e.preventDefault(); goHome(); }} href="/" style={{ cursor: 'pointer' }}>
          <div className="navbar-logo-icon">
            <span className="material-symbols-outlined">move_item</span>
          </div>
          <span className="navbar-logo-text">Control Shift</span>
        </a>

        <nav className="navbar-nav">
          <NavLink to="/"             className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>How it Works</NavLink>
          <NavLink to="/services"     className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>Services</NavLink>
          <NavLink to="/pricing"      className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>Pricing</NavLink>
        </nav>

        <div className="navbar-actions">
          <button className="navbar-cta-btn" onClick={goHome}>Get Started</button>
        </div>

        <button
          className={`navbar-menu-toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          <NavLink to="/"             className="navbar-mobile-link" onClick={close} end>Home</NavLink>
          <NavLink to="/how-it-works" className="navbar-mobile-link" onClick={close}>How it Works</NavLink>
          <NavLink to="/services"     className="navbar-mobile-link" onClick={close}>Services</NavLink>
          <NavLink to="/pricing"      className="navbar-mobile-link" onClick={close}>Pricing</NavLink>
          <div className="navbar-mobile-actions">
            <button className="navbar-cta-btn" onClick={() => { close(); goHome(); }}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}

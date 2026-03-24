import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

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

        <NavLink to="/" className="navbar-logo" onClick={() => window.location.href = '/'}>
          <div className="navbar-logo-icon">
            <span className="material-symbols-outlined">move_item</span>
          </div>
          <span className="navbar-logo-text">Control Shift</span>
        </NavLink>

        <nav className="navbar-nav">
          <NavLink to="/"             className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`} end>Home</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>How it Works</NavLink>
          <NavLink to="/services"     className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>Services</NavLink>
          <NavLink to="/pricing"      className={({ isActive }) => `navbar-nav-link${isActive ? ' active' : ''}`}>Pricing</NavLink>
        </nav>

        <div className="navbar-actions">
          <button className="navbar-cta-btn" onClick={() => window.location.href = '/'}>Get Started</button>
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
            <button className="navbar-cta-btn" onClick={() => window.location.href = '/'}>Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
}

// Navbar.jsx - Enhanced with Custom CSS

import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          <div className="navbar-logo-icon">
            <span className="material-symbols-outlined">move_item</span>
          </div>
          <span className="navbar-logo-text">Control Shift</span>
        </a>
        
        {/* Nav Links */}
        <nav className="navbar-nav">
          <a href="#" className="navbar-nav-link">How it Works</a>
          <a href="#" className="navbar-nav-link">Services</a>
          <a href="#" className="navbar-nav-link">Pricing</a>
        </nav>
        
        {/* Actions */}
        <div className="navbar-actions">
          <button className="navbar-login-btn">Login</button>
          <button className="navbar-cta-btn">Get Started</button>
        </div>
      </div>
    </header>
  );
}
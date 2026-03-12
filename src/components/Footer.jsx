// Footer.jsx - Clean Minimal Footer

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-logo">
            <span className="material-symbols-outlined footer-logo-icon">move_item</span>
            <span className="footer-logo-text">Control Shift</span>
          </div>
          
          <nav className="footer-nav">
            <a href="#" className="footer-nav-link">Privacy Policy</a>
            <a href="#" className="footer-nav-link">Terms of Service</a>
            <a href="#" className="footer-nav-link">Contact Support</a>
          </nav>
          
          <div className="footer-social">
            <div className="footer-social-icon">
              <span className="material-symbols-outlined">share</span>
            </div>
            <div className="footer-social-icon">
              <span className="material-symbols-outlined">mail</span>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            © 2023 Control Shift (Smoove). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
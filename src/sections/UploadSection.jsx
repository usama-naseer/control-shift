// UploadSection.jsx - Smart Video Inventory Upload Section

import { motion } from 'framer-motion';
import { DETECTED_ITEMS } from '../data/mockData';
import './UploadSection.css';

const UploadSection = () => {
  return (
    <section className="upload-section">
      <div className="upload-header">
        <h2 className="upload-title">Smart Video Inventory</h2>
        <p className="upload-description">
          Skip the manual entry. Record a quick walk-through of your home and our AI will automatically catalog every item and furniture piece.
        </p>
      </div>
      
      <div className="upload-content">
        {/* Video Processing Mock */}
        <div className="video-processing">
          <div className="video-background"></div>
          <div className="video-overlay"></div>
          
          {/* AI Detection Overlay */}
          <div className="detection-tag sofa">
            <span className="detection-dot"></span>
            <span className="detection-text">Sofa detected (Large)</span>
          </div>
          <div className="detection-tag table">
            <span className="detection-dot"></span>
            <span className="detection-text">Dining Table (Fragile)</span>
          </div>
          <div className="detection-tag lamp">
            <span className="detection-dot"></span>
            <span className="detection-text">Floor Lamp</span>
          </div>
          
          {/* Processing Bar */}
          <div className="processing-bar">
            <div className="processing-info">
              <span className="processing-label">Analyzing Walkthrough...</span>
              <span className="processing-percentage">88%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
        
        {/* Upload Zone */}
        <div className="upload-zone">
          <div className="upload-icon">
            <span className="material-symbols-outlined">cloud_upload</span>
          </div>
          <h3 className="upload-zone-title">Drag & Drop Video</h3>
          <p className="upload-zone-description">
            Supports MP4, MOV up to 500MB. Record each room clearly for 15-20 seconds.
          </p>
          <button className="browse-button">
            Browse Files
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
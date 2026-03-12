// TruckVisual.jsx - Enhanced with Custom CSS

import { motion } from 'framer-motion';
import './TruckVisual.css';

const TruckVisual = ({ utilizationPercent = 45, truckType = "Standard 20ft", capacity = 820 }) => {
  return (
    <div className="truck-visual">
      <div className="truck-visual-header">
        <div className="truck-visual-info">
          <h3>Load Estimate</h3>
          <p>Real-time truck capacity</p>
        </div>
        <div className="truck-utilization">
          <div className="utilization-percentage">{utilizationPercent}%</div>
          <p className="utilization-label">Utilized</p>
        </div>
      </div>
      
      {/* Dynamic Truck Visual */}
      <div className="truck-container">
        <div className="truck-wrapper">
          {/* Truck Cab */}
          <div className="truck-cab"></div>
          
          {/* Truck Trailer */}
          <div className="truck-trailer">
            <motion.div 
              className="truck-load"
              initial={{ height: 0 }}
              animate={{ height: `${utilizationPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="load-text">INVENTORY LOADED</span>
            </motion.div>
            <div className="truck-bg-icon">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
          </div>
          
          {/* Wheels */}
          <div className="truck-wheel left"></div>
          <div className="truck-wheel right"></div>
        </div>
      </div>
      
      <div className="truck-stats">
        <div className="truck-stats-row">
          <span className="truck-type">{truckType} Truck</span>
          <span className="truck-capacity">{capacity} cu ft available</span>
        </div>
        <div className="progress-container">
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${utilizationPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TruckVisual;
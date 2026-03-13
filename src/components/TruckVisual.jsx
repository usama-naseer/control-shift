// TruckVisual.jsx - Real-time Progress with Summary Sentence

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './TruckVisual.css';

const TruckVisual = ({ loadData, tierChanged }) => {
  // Calculate default fill for 2 bedrooms, 1 bathroom, 0 home office
  // Score: (2 × 1.0) + (1 × 0.3) + (0 × 0.8) = 2.3
  // Real-time fill: 5 + (2.3/10) * 90 = 5 + 20.7 = ~26%
  const [animatedFill, setAnimatedFill] = useState(loadData?.fillPercent || 26);
  const [previousTier, setPreviousTier] = useState(loadData?.tierName);
  
  // Smooth animation for fill changes - real-time updates
  useEffect(() => {
    if (loadData?.fillPercent !== undefined) {
      setAnimatedFill(loadData.fillPercent);
    }
  }, [loadData?.fillPercent]);

  // Track tier changes for text animations only
  useEffect(() => {
    if (loadData?.tierName && loadData.tierName !== previousTier) {
      setPreviousTier(loadData.tierName);
    }
  }, [loadData?.tierName, previousTier]);

  const fillPercent = animatedFill;
  const tierName = loadData?.tierName || "Standard Move";
  const hasNoRooms = loadData?.hasNoRooms || false;

  return (
    <div className={`truck-visual ${hasNoRooms ? 'no-load' : ''}`}>
      <div className="truck-visual-header">
        <div className="truck-visual-info">
          <h3>Load Estimate</h3>
          <p>{hasNoRooms ? 'Select rooms to start' : 'Real-time capacity'}</p>
        </div>
        <div className="truck-utilization">
          <motion.div 
            className="utilization-percentage"
            key={fillPercent}
            initial={{ scale: 1 }}
            animate={{ scale: hasNoRooms ? 1 : [1, 1.1, 1] }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {fillPercent}%
          </motion.div>
          <p className="utilization-label">Utilized</p>
        </div>
      </div>
      
      {/* Static Truck Visual - No Scaling */}
      <div className="truck-container">
        <div className="truck-wrapper">
          {/* Truck Cab */}
          <div className="truck-cab"></div>
          
          {/* Truck Trailer */}
          <div className={`truck-trailer ${hasNoRooms ? 'empty' : ''}`}>
            {/* Real-time animated truck fill */}
            <div 
              className="truck-load"
              style={{ 
                height: `${fillPercent}%`,
                transition: 'height 400ms ease-out',
                opacity: hasNoRooms ? 0.3 : 1
              }}
            />
            
            {/* Load text - always visible */}
            <div className="load-text-container">
              <span className="load-text">
                {hasNoRooms ? 'SELECT ROOMS' : 'INVENTORY LOADED'}
              </span>
            </div>
            
            <div className="truck-bg-icon">
              <span className="material-symbols-outlined">
                {hasNoRooms ? 'home' : 'local_shipping'}
              </span>
            </div>
          </div>
          
          {/* Wheels */}
          <div className="truck-wheel left"></div>
          <div className="truck-wheel right"></div>
        </div>
      </div>
      
      <div className="truck-stats">
        <div className="truck-stats-row">
          {/* Animated tier name with cross-fade */}
          <AnimatePresence mode="wait">
            <motion.span 
              key={tierName}
              className={`truck-type ${hasNoRooms ? 'no-load-tier' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {tierName}
            </motion.span>
          </AnimatePresence>
          
          <span className="truck-capacity">Move Size</span>
        </div>
        
        <div className="progress-container">
          {/* Real-time animated progress bar */}
          <div 
            className={`progress-bar ${hasNoRooms ? 'empty' : ''}`}
            style={{ 
              width: `${fillPercent}%`,
              transition: 'width 400ms ease-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TruckVisual;
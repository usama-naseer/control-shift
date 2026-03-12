// HeroSection.jsx - Enhanced with Custom CSS

import { useState } from 'react';
import { motion } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import TruckVisual from '../components/TruckVisual';
import { ROOM_TYPES } from '../data/mockData';
import { calculateLoadEstimate } from '../utils/truckLogic';
import './HeroSection.css';

const HeroSection = () => {
  const [roomCounts, setRoomCounts] = useState({
    bedrooms: 2,
    bathrooms: 1,
    specialty: 1
  });

  const handleRoomSelect = (roomId) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomId]: prev[roomId] > 0 ? prev[roomId] : 1
    }));
  };

  const handleCountChange = (roomId, newCount) => {
    setRoomCounts(prev => ({
      ...prev,
      [roomId]: Math.max(0, newCount)
    }));
  };

  const loadEstimate = calculateLoadEstimate(roomCounts);

  return (
    <div className="hero-section">
      {/* Left Column - 7/12 */}
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">AI-Powered Relocation</span>
          
          <h1 className="hero-headline">
            Move with Moving <span className="hero-headline-accent">Fluidity.</span>
          </h1>
          
          <p className="hero-description">
            Experience the future of relocation with real-time AI inventory scanning and seamless room-by-room planning.
          </p>
        </div>
        
        {/* Room Selector Component */}
        <div className="room-selector-card">
          <h3 className="room-selector-title">1. Select Your Rooms</h3>
          <div className="room-grid">
            {ROOM_TYPES.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                count={roomCounts[room.id]}
                isSelected={roomCounts[room.id] > 0}
                onSelect={handleRoomSelect}
                onCountChange={handleCountChange}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Right Column - 5/12 */}
      <div className="hero-visual">
        <div className="truck-visual-container">
          <TruckVisual 
            utilizationPercent={40}
            truckType={loadEstimate.truckType}
            capacity={loadEstimate.capacity}
          />
        </div>
        
        <div className="smart-match-container">
          <div className="smart-match-card">
            <div className="smart-match-content">
              <div className="smart-match-icon">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <div className="smart-match-text">
                <h4>Smart Match Active</h4>
                <p>3 movers suggested for this load</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
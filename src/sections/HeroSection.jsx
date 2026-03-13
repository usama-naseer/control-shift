// HeroSection.jsx - Final Simplified Logic Implementation

import { motion, AnimatePresence } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import TruckVisual from '../components/TruckVisual';
import { useRoomCounter } from '../hooks/useRoomCounter';
import './HeroSection.css';

// Room types configuration - final version
const ROOM_TYPES = [
  {
    id: 'bedrooms',
    label: 'Bedrooms',
    subtitle: 'Master & Guest',
    icon: 'bed'
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms',
    subtitle: 'Add count',
    icon: 'bathtub'
  },
  {
    id: 'homeOffice',
    label: 'Home Office',
    subtitle: '1 Workspace',
    icon: 'work'
  }
];

const HeroSection = () => {
  const {
    rooms,
    incrementRoom,
    decrementRoom,
    loadData,
    tierChanged,
    moversCount
  } = useRoomCounter();

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
                count={rooms[room.id]}
                onIncrement={incrementRoom}
                onDecrement={decrementRoom}
              />
            ))}
          </div>
          
          {/* Summary Message - Below Room Selectors */}
          <div className="summary-container">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadData.sentence}
                className="summary-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {loadData.sentence}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Right Column - 5/12 */}
      <div className="hero-visual">
        <div className="truck-visual-container">
          <TruckVisual 
            loadData={loadData}
            tierChanged={tierChanged}
          />
        </div>
        
        <div className="smart-match-container">
          <div className="smart-match-card">
            <div className="smart-match-content">
              <div className="smart-match-icon">
                <span className="material-symbols-outlined">
                  {moversCount === 0 ? 'help' : 'verified'}
                </span>
              </div>
              <div className="smart-match-text">
                <h4>{moversCount === 0 ? 'Smart Match Ready' : 'Smart Match Active'}</h4>
                <p>
                  {moversCount === 0 
                    ? 'Select rooms to get mover suggestions'
                    : `${moversCount} mover${moversCount !== 1 ? 's' : ''} suggested for this load`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
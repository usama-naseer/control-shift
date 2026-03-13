// RoomCard.jsx - Enhanced with Counter Logic

import { motion } from 'framer-motion';
import './RoomCard.css';

const RoomCard = ({ 
  room, 
  count = 0, 
  onIncrement,
  onDecrement
}) => {
  const handleIncrement = (e) => {
    e.stopPropagation();
    onIncrement(room.id);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    onDecrement(room.id);
  };

  // All cards have the same styling with blue borders
  const cardClass = `room-card ${count > 0 ? 'selected' : 'default'} ${room.id}`;

  return (
    <motion.div
      className={cardClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="room-card-header">
        <span className="material-symbols-outlined room-card-icon">
          {room.icon}
        </span>
        
        {/* Counter with increment/decrement logic */}
        <div className="room-counter-container">
          {count === 0 ? (
            // Only show + button when count is 0
            <button 
              className="room-counter add-button"
              onClick={handleIncrement}
              aria-label={`Add ${room.label}`}
            >
              +
            </button>
          ) : (
            // Show - count + when count > 0
            <div className="room-counter-group">
              <button 
                className="room-counter-btn decrement"
                onClick={handleDecrement}
                aria-label={`Remove ${room.label}`}
              >
                −
              </button>
              <span className="room-counter selected">
                {count}
              </span>
              <button 
                className="room-counter-btn increment"
                onClick={handleIncrement}
                aria-label={`Add ${room.label}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="room-card-content">
        <h4>{room.label}</h4>
        <p>{room.subtitle}</p>
      </div>
    </motion.div>
  );
};

export default RoomCard;
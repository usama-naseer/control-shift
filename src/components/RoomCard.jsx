// RoomCard.jsx - Enhanced with Custom CSS

import { motion } from 'framer-motion';
import './RoomCard.css';

const RoomCard = ({ 
  room, 
  count = 0, 
  isSelected = false, 
  onSelect, 
  onCountChange 
}) => {
  const handleIncrement = (e) => {
    e.stopPropagation();
    onCountChange(room.id, count + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (count > 0) {
      onCountChange(room.id, count - 1);
    }
  };

  // All cards have the same styling with blue borders
  const cardClass = `room-card ${count > 0 ? 'selected' : 'default'} ${room.id}`;

  return (
    <motion.div
      className={cardClass}
      onClick={() => onSelect(room.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className="room-card-header">
        <span className="material-symbols-outlined room-card-icon">
          {room.icon}
        </span>
        
        {/* Always show blue counter, either with count or + */}
        <div className={`room-counter ${count > 0 ? 'selected' : 'add-button'}`}>
          {count > 0 ? count : '+'}
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
import { motion, AnimatePresence } from 'framer-motion';
import RoomCard from '../components/RoomCard';
import TruckVisual from '../components/TruckVisual';
import './HeroSection.css';

const ROOM_TYPES = [
  { id: 'bedrooms',   label: 'Bedrooms',    subtitle: 'Master & Guest', icon: 'bed'    },
  { id: 'bathrooms',  label: 'Bathrooms',   subtitle: 'Add count',      icon: 'bathtub'},
  { id: 'homeOffice', label: 'Home Office', subtitle: '1 Workspace',    icon: 'work'   }
];

// Stagger container for children
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const HeroSection = ({ roomCounter }) => {
  const { rooms, incrementRoom, decrementRoom, loadData, tierChanged, moversCount } = roomCounter;

  return (
    <div className="hero-section">
      {/* Left Column */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-text" variants={container}>
          <motion.span className="hero-badge" variants={fadeUp}>
            <span className="hero-badge-dot" />
            AI-Powered Relocation
          </motion.span>

          <motion.h1 className="hero-headline" variants={fadeUp}>
            Move with{' '}
            <span className="hero-headline-accent">
              Moving Fluidity.
            </span>
          </motion.h1>

          <motion.p className="hero-description" variants={fadeUp}>
            Experience the future of relocation with real-time AI inventory
            scanning and seamless room-by-room planning.
          </motion.p>
        </motion.div>

        {/* Room Selector Card */}
        <motion.div className="room-selector-card" variants={fadeUp}>
          <h3 className="room-selector-title">
            <span className="step-num">1</span>
            Select Your Rooms
          </h3>
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

          <div className="summary-container">
            <AnimatePresence mode="wait">
              <motion.p
                key={loadData.sentence}
                className="summary-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {loadData.sentence}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        className="hero-visual"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="truck-visual-container" variants={fadeRight}>
          <TruckVisual loadData={loadData} tierChanged={tierChanged} />
        </motion.div>

        <motion.div className="smart-match-container" variants={fadeRight}>
          <div className="smart-match-card">
            <div className="smart-match-content">
              <motion.div
                className="smart-match-icon"
                animate={{ scale: moversCount > 0 ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 0.4 }}
              >
                <span className="material-symbols-outlined">
                  {moversCount === 0 ? 'help' : 'verified'}
                </span>
              </motion.div>
              <div className="smart-match-text">
                <AnimatePresence mode="wait">
                  <motion.h4
                    key={moversCount === 0 ? 'ready' : 'active'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {moversCount === 0 ? 'Smart Match Ready' : 'Smart Match Active'}
                  </motion.h4>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={moversCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {moversCount === 0
                      ? 'Select rooms to get mover suggestions'
                      : `${moversCount} mover${moversCount !== 1 ? 's' : ''} suggested for this load`
                    }
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

// truckLogic.js - Final Simplified Business Logic

// Room counter constants
export const ROOM_LIMITS = {
  MIN: 0,
  MAX: 10
};

// Final starting values
export const DEFAULT_ROOM_COUNTS = {
  bedrooms: 2,
  bathrooms: 1,
  homeOffice: 0
};

// Load tiers with exact specifications including zero load case
export const LOAD_TIERS = [
  {
    name: 'No Load',
    minScore: 0,
    maxScore: 0,
    fillPercent: 0,
    sentence: 'Select your rooms to get a personalized moving estimate.'
  },
  {
    name: 'Small Move',
    minScore: 0.1,
    maxScore: 1.5,
    fillPercent: 20,
    sentence: 'Your home is a Small Move — light and quick, usually done in a few hours.'
  },
  {
    name: 'Standard Move',
    minScore: 1.6,
    maxScore: 3.5,
    fillPercent: 45,
    sentence: 'Your home is a Standard Move — most of our customers are in this range.'
  },
  {
    name: 'Large Move',
    minScore: 3.6,
    maxScore: 6.0,
    fillPercent: 70,
    sentence: "Your home is a Large Move — we'll assign a dedicated team to yours."
  },
  {
    name: 'Extra Large Move',
    minScore: 6.1,
    maxScore: Infinity,
    fillPercent: 90,
    sentence: "Your home is an Extra Large Move — we'll do a quick consultation to get this right."
  }
];

// Room counter logic
export function updateRoomCount(currentCount, action) {
  if (action === 'increment') {
    return Math.min(ROOM_LIMITS.MAX, currentCount + 1);
  } else if (action === 'decrement') {
    return Math.max(ROOM_LIMITS.MIN, currentCount - 1);
  }
  return currentCount;
}
// Calculate load score - exact formula
export function calculateLoadScore(rooms) {
  const { bedrooms = 2, bathrooms = 1, homeOffice = 0 } = rooms;
  return (bedrooms * 1.0) + (bathrooms * 0.3) + (homeOffice * 0.8);
}

// Get tier based on load score
export function getLoadTier(score) {
  return LOAD_TIERS.find(tier => 
    score >= tier.minScore && score <= tier.maxScore
  ) || LOAD_TIERS[LOAD_TIERS.length - 1];
}

// Calculate real-time fill percentage based on score with zero handling
export function calculateRealTimeFillPercent(score) {
  // Handle zero score case
  if (score === 0) {
    return 0; // Empty truck for no load
  }
  
  // Map score to a continuous percentage between 5% and 95%
  const maxScore = 10; // Reasonable maximum for UI purposes
  const minFill = 5;
  const maxFill = 95;
  
  // Clamp score to reasonable range
  const clampedScore = Math.min(maxScore, Math.max(0.1, score)); // Minimum 0.1 for non-zero scores
  
  // Linear interpolation for smooth real-time updates
  const fillPercent = minFill + ((clampedScore - 0.1) / (maxScore - 0.1)) * (maxFill - minFill);
  
  return Math.round(fillPercent);
}

// Main calculation function with real-time fill and edge case handling
export function calculateLoadEstimate(rooms) {
  const score = calculateLoadScore(rooms);
  const tier = getLoadTier(score);
  const realTimeFill = calculateRealTimeFillPercent(score);
  
  // Check if all rooms are zero (no load selected)
  const { bedrooms = 0, bathrooms = 0, homeOffice = 0 } = rooms;
  const hasNoRooms = bedrooms === 0 && bathrooms === 0 && homeOffice === 0;
  
  return {
    score: score,
    tierName: tier.name,
    fillPercent: realTimeFill,
    tierFillPercent: tier.fillPercent,
    sentence: tier.sentence,
    hasNoRooms: hasNoRooms // Flag for UI handling
  };
}

// Check if tier changed (for animation triggers)
export function hasTierChanged(oldRooms, newRooms) {
  const oldScore = calculateLoadScore(oldRooms);
  const newScore = calculateLoadScore(newRooms);
  const oldTier = getLoadTier(oldScore);
  const newTier = getLoadTier(newScore);
  
  return oldTier.name !== newTier.name;
}

// Calculate suggested movers with zero handling
export function calculateMovers(rooms) {
  const { bedrooms = 2, bathrooms = 1, homeOffice = 0 } = rooms;
  const totalRooms = bedrooms + bathrooms + homeOffice;
  
  // Handle no rooms selected case
  if (totalRooms === 0) return 0;
  
  if (totalRooms <= 2) return 1;
  if (totalRooms <= 4) return 2;
  return 3;
}

// Validate room counts
export function validateRoomCounts(rooms) {
  const validated = {};
  
  Object.keys(DEFAULT_ROOM_COUNTS).forEach(roomType => {
    const count = rooms[roomType] ?? DEFAULT_ROOM_COUNTS[roomType];
    validated[roomType] = Math.min(ROOM_LIMITS.MAX, Math.max(ROOM_LIMITS.MIN, count));
  });
  
  return validated;
}
// Legacy compatibility functions
export const calculateTruckSize = (rooms) => {
  const loadData = calculateLoadEstimate(rooms);
  return {
    type: loadData.tierName,
    capacity: loadData.tierName,
    utilization: loadData.fillPercent,
    score: loadData.score
  };
};

export const calculateScore = calculateLoadScore; // Alias for compatibility

export const getTruckTier = (score) => {
  const tier = getLoadTier(score);
  return {
    name: tier.name,
    capacity: tier.name,
    minScore: tier.minScore,
    maxScore: tier.maxScore,
    basePct: tier.fillPercent
  };
};

export const calcTruck = (roomCounts) => {
  const rooms = {
    bedrooms: roomCounts.bedrooms || DEFAULT_ROOM_COUNTS.bedrooms,
    bathrooms: roomCounts.bathrooms || DEFAULT_ROOM_COUNTS.bathrooms,
    homeOffice: roomCounts.specialty || roomCounts.homeOffice || DEFAULT_ROOM_COUNTS.homeOffice
  };
  
  const result = calculateLoadEstimate(rooms);
  
  return {
    tier: {
      label: result.tierName,
      cuFt: result.tierName,
      pct: result.fillPercent
    },
    utilizationPercent: result.fillPercent,
    totalRooms: rooms.bedrooms + rooms.bathrooms + rooms.homeOffice,
    estimatedWeight: result.score
  };
};

export const getRoomTypeById = (roomId) => {
  const roomTypes = {
    bedrooms: { id: "bedrooms", label: "Bedrooms", subtitle: "Master & Guest", icon: "bed", weight: 1.0 },
    bathrooms: { id: "bathrooms", label: "Bathrooms", subtitle: "Add count", icon: "bathtub", weight: 0.3 },
    homeOffice: { id: "homeOffice", label: "Home Office", subtitle: "1 Workspace", icon: "work", weight: 0.8 },
    specialty: { id: "specialty", label: "Home Office", subtitle: "1 Workspace", icon: "work", weight: 0.8 }
  };
  return roomTypes[roomId];
};
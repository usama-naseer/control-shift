// truckLogic.js - Truck size calculation and load estimation

import { TRUCK_TIERS } from '../data/mockData.js';

export const calcTruck = (roomCounts) => {
  // Calculate total room weight based on room types and counts
  const totalWeight = Object.entries(roomCounts).reduce((total, [roomId, count]) => {
    const roomType = getRoomTypeById(roomId);
    return total + (roomType ? roomType.weight * count : 0);
  }, 0);

  // Find appropriate truck tier
  const truckTier = TRUCK_TIERS.find(tier => 
    totalWeight >= tier.min && totalWeight <= tier.max
  ) || TRUCK_TIERS[TRUCK_TIERS.length - 1]; // Default to largest if over max

  return {
    tier: truckTier,
    utilizationPercent: Math.min(truckTier.pct, 100),
    totalRooms: Object.values(roomCounts).reduce((sum, count) => sum + count, 0),
    estimatedWeight: totalWeight
  };
};

export const getRoomTypeById = (roomId) => {
  const roomTypes = {
    bedrooms: { id: "bedrooms", label: "Bedrooms", subtitle: "Master & Guest", icon: "bed", weight: 1.0 },
    bathrooms: { id: "bathrooms", label: "Bathrooms", subtitle: "Add count", icon: "bathtub", weight: 0.4 },
    specialty: { id: "specialty", label: "Home Office", subtitle: "1 Workspace", icon: "work", weight: 0.6 }
  };
  return roomTypes[roomId];
};

export const calculateLoadEstimate = (roomCounts) => {
  const result = calcTruck(roomCounts);
  return {
    truckType: result.tier.label,
    capacity: result.tier.cuFt,
    utilizationPercent: result.utilizationPercent,
    totalRooms: result.totalRooms
  };
};
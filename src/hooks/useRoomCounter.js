// useRoomCounter.js - Simplified React hook for final logic

import { useState, useCallback, useMemo, useRef } from 'react';
import { 
  DEFAULT_ROOM_COUNTS, 
  updateRoomCount, 
  calculateLoadEstimate, 
  calculateMovers,
  validateRoomCounts,
  hasTierChanged
} from '../utils/truckLogic.js';

export function useRoomCounter(initialRooms = DEFAULT_ROOM_COUNTS) {
  // Initialize with validated room counts
  const [rooms, setRooms] = useState(() => validateRoomCounts(initialRooms));
  const previousRooms = useRef(rooms);

  // Update a specific room count
  const updateRoom = useCallback((roomType, action) => {
    setRooms(prevRooms => {
      const currentCount = prevRooms[roomType] || 0;
      const newCount = updateRoomCount(currentCount, action);
      
      const newRooms = {
        ...prevRooms,
        [roomType]: newCount
      };
      
      // Store previous rooms for tier change detection
      previousRooms.current = prevRooms;
      
      return newRooms;
    });
  }, []);

  // Increment room count
  const incrementRoom = useCallback((roomType) => {
    updateRoom(roomType, 'increment');
  }, [updateRoom]);

  // Decrement room count
  const decrementRoom = useCallback((roomType) => {
    updateRoom(roomType, 'decrement');
  }, [updateRoom]);

  // Set room count directly
  const setRoomCount = useCallback((roomType, count) => {
    setRooms(prevRooms => {
      previousRooms.current = prevRooms;
      return {
        ...prevRooms,
        [roomType]: Math.min(10, Math.max(0, count))
      };
    });
  }, []);

  // Reset to default counts
  const resetRooms = useCallback(() => {
    setRooms(prevRooms => {
      previousRooms.current = prevRooms;
      return DEFAULT_ROOM_COUNTS;
    });
  }, []);

  // Calculate derived values (memoized for performance)
  const loadData = useMemo(() => calculateLoadEstimate(rooms), [rooms]);
  const moversCount = useMemo(() => calculateMovers(rooms), [rooms]);
  const totalRooms = useMemo(() => 
    rooms.bedrooms + rooms.bathrooms + rooms.homeOffice, [rooms]
  );

  // Check if tier changed (for animation triggers)
  const tierChanged = useMemo(() => 
    hasTierChanged(previousRooms.current, rooms), [rooms]
  );

  // Legacy compatibility - truck data format
  const truckData = useMemo(() => ({
    type: loadData.tierName,
    capacity: loadData.tierName,
    utilization: loadData.fillPercent,
    score: loadData.score
  }), [loadData]);

  return {
    // State
    rooms,
    
    // Actions
    incrementRoom,
    decrementRoom,
    setRoomCount,
    resetRooms,
    
    // Final simplified data
    loadData,           // { score, tierName, fillPercent, sentence }
    tierChanged,        // For animation triggers
    
    // Legacy compatibility
    truckData,
    moversCount,
    totalRooms,
    
    // Individual room counts for easy access
    bedrooms: rooms.bedrooms,
    bathrooms: rooms.bathrooms,
    homeOffice: rooms.homeOffice
  };
}
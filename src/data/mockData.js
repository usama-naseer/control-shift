// Mock Data - Exact Figma Specifications

export const ROOM_TYPES = [
  { id: "bedrooms", label: "Bedrooms", subtitle: "Master & Guest", icon: "bed", weight: 1.0 },
  { id: "bathrooms", label: "Bathrooms", subtitle: "Add count", icon: "bathtub", weight: 0.4 },
  { id: "specialty", label: "Home Office", subtitle: "1 Workspace", icon: "work", weight: 0.6 },
];

export const TRUCK_TIERS = [
  { min: 0, max: 1, label: "Studio Van", cuFt: 250, pct: 20 },
  { min: 2, max: 3, label: "Standard 10ft", cuFt: 400, pct: 40 },
  { min: 4, max: 5, label: "Standard 20ft", cuFt: 820, pct: 65 },
  { min: 6, max: 99, label: "Large 26ft", cuFt: 1200, pct: 85 },
];

export const DETECTED_ITEMS = [
  { id: 1, name: 'Sofa detected (Large)', category: 'Furniture', confidence: 0.97, icon: 'chair' },
  { id: 2, name: 'Dining Table (Fragile)', category: 'Furniture', confidence: 0.94, icon: 'table_restaurant' },
  { id: 3, name: 'Floor Lamp', category: 'Lighting', confidence: 0.91, icon: 'lightbulb' },
  { id: 4, name: '65" TV', category: 'Electronics', confidence: 0.88, icon: 'tv' },
  { id: 5, name: 'Bookshelf', category: 'Furniture', confidence: 0.85, icon: 'menu_book' },
  { id: 6, name: 'Refrigerator', category: 'Appliance', confidence: 0.92, icon: 'kitchen' },
  { id: 7, name: 'Coffee Table', category: 'Furniture', confidence: 0.89, icon: 'coffee' },
  { id: 8, name: 'Artwork', category: 'Fragile', confidence: 0.83, icon: 'palette' },
];

export const TIME_SLOTS = [
  '09:00 AM',
  '11:30 AM', 
  '02:00 PM',
  '04:30 PM'
];

export const QUOTE_RATES = {
  basePrices: {
    studio: 299,
    small: 499,
    standard: 799,
    large: 1199
  },
  perItem: 15,
  weekendSurcharge: 75,
  serviceFeePercent: 0.1
};
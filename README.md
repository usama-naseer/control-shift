# Control Shift (Smoove) - AI-Powered Relocation Platform

A modern, responsive React SPA for Control Shift's AI-powered relocation concierge service. Built with cutting-edge web technologies and optimized for all devices.

## 🚀 Quick Start

```bash
cd control-shift/smoove-ui
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Live Features

✅ **Fully Responsive Design** - Optimized for mobile, tablet, and desktop
✅ **Complete UI Implementation** - All sections from Figma design
✅ **Interactive Components** - Room selector, truck visualization, calendar
✅ **Smooth Animations** - Framer Motion powered transitions
✅ **Modern Design System** - CSS custom properties and utility classes
✅ **Dark Mode Support** - Automatic theme detection
✅ **Accessibility Ready** - WCAG compliant components

## 🛠 Tech Stack

- **React 19** - Latest UI framework with concurrent features
- **Vite 7** - Lightning-fast build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion 11** - Production-ready animation library
- **CSS Custom Properties** - Modern responsive design system
- **Plus Jakarta Sans** - Display font (headings)
- **Inter** - Body text font
- **Material Symbols** - Google's icon system

## 📁 Project Structure

```
smoove-ui/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Sticky navigation header
│   │   ├── RoomCard.jsx     # Interactive room selector cards
│   │   ├── TruckVisual.jsx  # Animated truck load estimator
│   │   ├── Button.jsx       # Reusable button component
│   │   ├── Footer.jsx       # Site footer with links
│   │   └── SectionWrapper.jsx # Layout wrapper component
│   ├── sections/            # Main page sections
│   │   ├── HeroSection.jsx  # Hero with room selector
│   │   ├── UploadSection.jsx # Smart video inventory
│   │   └── SchedulerSection.jsx # Calendar & quotation
│   ├── utils/               # Utility functions
│   │   ├── truckLogic.js    # Truck size calculations
│   │   └── motion.js        # Animation configurations
│   ├── data/                # Mock data and constants
│   │   └── mockData.js      # Sample room and pricing data
│   ├── styles/              # CSS system
│   │   ├── tokens.css       # Design system variables
│   │   └── responsive.css   # Responsive utility classes
│   └── assets/              # Static assets
├── public/                  # Public assets
└── dist/                    # Production build output
```

## 🎨 Design System

### Color Palette
```css
--color-primary: #0057FF;           /* Primary blue */
--color-background-light: #F8FAFC;  /* Light background */
--color-background-dark: #0F1723;   /* Dark theme background */
--color-slate-text: #1E293B;        /* Primary text */
--color-muted-text: #64748B;        /* Secondary text */
--color-success-teal: #2DD4BF;      /* Success states */
--color-dark-card: #0F172A;         /* Dark mode cards */
```

### Typography Scale
```css
--text-7xl: clamp(3rem, 8vw, 4.5rem);    /* Hero headlines */
--text-5xl: clamp(2.5rem, 6vw, 3rem);    /* Section titles */
--text-3xl: clamp(1.75rem, 4vw, 2.25rem); /* Card titles */
--text-lg: clamp(1rem, 2vw, 1.125rem);   /* Body text */
--text-caption: 0.625rem;                 /* Small text */
```

### Responsive Breakpoints
- **Mobile**: ≤640px (Single column, touch-optimized)
- **Tablet**: 641px-1024px (Balanced layouts)
- **Desktop**: ≥1025px (Full multi-column layouts)

## 🏗 Component Architecture

### Core Components
- **Navbar** - Sticky header with responsive navigation
- **HeroSection** - Two-column layout with room selector (7/12 + 5/12)
- **RoomCard** - Interactive cards with counters and animations
- **TruckVisual** - Real-time load estimation with progress bars
- **UploadSection** - Smart video inventory with AI detection simulation
- **SchedulerSection** - Calendar widget with quotation calculator
- **Footer** - Clean minimal footer with social links

### Interactive Features
- **Room Selection** - Dynamic room counting with visual feedback
- **Truck Load Estimation** - Real-time capacity calculation and visualization
- **Calendar Integration** - Date and time slot selection
- **Price Calculator** - Dynamic quotation based on selections
- **Video Upload Simulation** - AI-powered inventory detection demo

## 📱 Responsive Features

### Mobile-First Design
- **Fluid Typography** - Scales smoothly across all screen sizes
- **Touch-Friendly** - Optimized button sizes and spacing
- **Single Column** - Stacked layouts for mobile readability
- **Optimized Images** - Responsive aspect ratios and loading

### Tablet Optimization
- **Balanced Layouts** - Two-column grids where appropriate
- **Enhanced Navigation** - Expanded menu options
- **Improved Spacing** - Better content distribution

### Desktop Experience
- **Multi-Column Layouts** - Full Figma design implementation
- **Advanced Interactions** - Hover states and micro-animations
- **Optimal Typography** - Large, readable text hierarchy

## 🎭 Animation System

### Framer Motion Integration
- **Page Transitions** - Smooth section reveals
- **Component Animations** - Fade-in, slide-up effects
- **Interactive Feedback** - Hover and click animations
- **Performance Optimized** - Hardware-accelerated transforms

### Animation Classes
```css
.animate-fade-in        /* Basic fade in */
.animate-fade-in-up     /* Fade in with upward motion */
.animate-fade-in-left   /* Slide in from left */
.animate-fade-in-right  /* Slide in from right */
```

## 🌙 Dark Mode Support

Automatic dark mode detection with:
- **System Preference** - Respects user's OS setting
- **Consistent Theming** - All components support dark mode
- **Proper Contrast** - WCAG AA compliant color ratios
- **Smooth Transitions** - Animated theme switching

## ♿ Accessibility Features

- **Semantic HTML** - Proper heading hierarchy and landmarks
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and descriptions
- **Focus Management** - Visible focus indicators
- **Reduced Motion** - Respects user motion preferences
- **Color Contrast** - WCAG AA compliant color combinations

## 🚀 Performance Optimizations

### Build Optimizations
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Unused code elimination
- **Asset Optimization** - Compressed images and fonts
- **CSS Purging** - Unused styles removed in production

### Runtime Performance
- **Lazy Loading** - Components loaded on demand
- **Memoization** - React.memo for expensive components
- **Efficient Animations** - GPU-accelerated transforms
- **Optimized Renders** - Minimal re-render cycles

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
```

## 🔧 Development Guidelines

### Component Structure
```jsx
// Component with CSS modules and responsive design
import './ComponentName.css';

export default function ComponentName({ prop1, prop2 }) {
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
}
```

### CSS Architecture
- **CSS Custom Properties** - Use design tokens from `tokens.css`
- **Mobile-First** - Start with mobile styles, enhance for larger screens
- **BEM Methodology** - Block, Element, Modifier naming convention
- **Responsive Utilities** - Use classes from `responsive.css`

### Animation Guidelines
- **Subtle Animations** - Enhance UX without being distracting
- **Performance First** - Use `transform` and `opacity` for animations
- **Reduced Motion** - Always provide fallbacks for accessibility
- **Consistent Timing** - Use standard easing curves

## 🌐 Browser Support

- **Modern Browsers** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers** - iOS Safari 14+, Chrome Mobile 90+
- **CSS Features** - CSS Grid, Flexbox, Custom Properties, `clamp()`
- **JavaScript** - ES2020+ features, async/await, modules

## 📈 Current Status

✅ **Phase I Complete** - Project setup and foundation
✅ **Phase II Complete** - Navbar and Hero section with room selector
✅ **Phase III Complete** - Smart video inventory section
✅ **Phase IV Complete** - Calendar and quotation system
✅ **Phase V Complete** - Footer and final polish
✅ **Phase VI Complete** - Responsive optimization and mobile-first design

## 🎯 Future Enhancements

- **Backend Integration** - API connections for real data
- **User Authentication** - Login and user management
- **Payment Processing** - Stripe integration for bookings
- **Real-time Updates** - WebSocket connections for live updates
- **Progressive Web App** - Offline functionality and app-like experience
- **Advanced Analytics** - User behavior tracking and insights

## 📄 License

This project is proprietary software developed for Control Shift.

---

**Built with ❤️ using modern web technologies for the best user experience across all devices.**
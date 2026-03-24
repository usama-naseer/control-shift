import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import UploadSection from './sections/UploadSection';
import SchedulerSection from './sections/SchedulerSection';
import SectionWrapper from './components/SectionWrapper';
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import { useRoomCounter } from './hooks/useRoomCounter';

function HomePage() {
  const roomCounter = useRoomCounter();
  const [scannedCount, setScannedCount] = useState(0);
  const [videoAnalysed, setVideoAnalysed] = useState(false);
  const [inventoryConfirmed, setInventoryConfirmed] = useState(false);

  const handleScanComplete = (count) => { setScannedCount(count); setVideoAnalysed(true); };
  const handleInventoryConfirmed = () => setInventoryConfirmed(true);
  const handleReset = () => { setScannedCount(0); setVideoAnalysed(false); setInventoryConfirmed(false); };

  return (
    <main>
      <HeroSection roomCounter={roomCounter} />
      <SectionWrapper>
        <UploadSection
          onScanComplete={handleScanComplete}
          onInventoryConfirmed={handleInventoryConfirmed}
          onReset={handleReset}
        />
        <SchedulerSection
          totalRooms={roomCounter.totalRooms}
          scannedCount={scannedCount}
          videoAnalysed={videoAnalysed}
          inventoryConfirmed={inventoryConfirmed}
        />
      </SectionWrapper>
    </main>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

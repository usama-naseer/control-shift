import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import UploadSection from './sections/UploadSection';
import SchedulerSection from './sections/SchedulerSection';
import SectionWrapper from './components/SectionWrapper';
import { useRoomCounter } from './hooks/useRoomCounter';

function App() {
  // Lifted state — shared across HeroSection and SchedulerSection
  const roomCounter = useRoomCounter();

  // Lifted from UploadSection — number of detected items after analysis
  const [scannedCount, setScannedCount] = useState(0);
  const [videoAnalysed, setVideoAnalysed] = useState(false);
  const [inventoryConfirmed, setInventoryConfirmed] = useState(false);

  const handleScanComplete = (count) => { setScannedCount(count); setVideoAnalysed(true); };
  const handleInventoryConfirmed = () => setInventoryConfirmed(true);
  const handleReset = () => { setScannedCount(0); setVideoAnalysed(false); setInventoryConfirmed(false); };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;

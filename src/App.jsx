import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import UploadSection from './sections/UploadSection';
import SchedulerSection from './sections/SchedulerSection';
import SectionWrapper from './components/SectionWrapper';

function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <SectionWrapper>
          <UploadSection />
          <SchedulerSection />
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default App;
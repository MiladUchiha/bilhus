import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import CarShowcaseSection from '@/components/CarShowcaseSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
    
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <CarShowcaseSection />
    
    </main>
  );
}

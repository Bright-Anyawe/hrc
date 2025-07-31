import HeroSection from '@/components/HeroSection';
import AnimatedPage from '@/components/AnimatedPage';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUs />
        <ContactSection />
      </main>
    </AnimatedPage>
  );
}
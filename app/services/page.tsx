import ServicesSection from '@/components/ServicesSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export default function ServicesPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero 
          title="Our Services" 
          subtitle="What we offer"
          backgroundImage="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <ServicesSection />
      </main>
    </AnimatedPage>
  );
}

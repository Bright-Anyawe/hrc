import AboutSection from '@/components/AboutSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export default function AboutPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero 
          title="About Us" 
          subtitle="Learn more about our company" 
          backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <AboutSection />
      </main>
    </AnimatedPage>
  );
}

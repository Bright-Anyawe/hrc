import AboutSection from '@/components/AboutSection';
import AnimatedPage from '@/components/AnimatedPage';

export default function AboutPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <AboutSection />
      </main>
    </AnimatedPage>
  );
}

import ContactSection from '@/components/ContactSection';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export default function ContactPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero 
          title="Contact Us" 
          subtitle="Get in touch with us"
          backgroundImage="https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <ContactSection />
      </main>
    </AnimatedPage>
  );
}

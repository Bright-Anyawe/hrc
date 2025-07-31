import WhyChooseUs from '@/components/WhyChooseUs';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export default function WhyChooseUsPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero 
          title="Why Choose Us" 
          subtitle="Discover the advantages of working with us"
          backgroundImage="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <WhyChooseUs />
      </main>
    </AnimatedPage>
  );
}

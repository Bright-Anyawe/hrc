import ProductsClientsProjects from '@/components/ProductsClientsProjects';
import AnimatedPage from '@/components/AnimatedPage';
import PageHero from '@/components/PageHero';

export default function ProjectsPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <PageHero 
          title="Our Projects" 
          subtitle="A showcase of our work"
          backgroundImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <ProductsClientsProjects />
      </main>
    </AnimatedPage>
  );
}

import ProductsClientsProjects from '@/components/ProductsClientsProjects';
import AnimatedPage from '@/components/AnimatedPage';

export default function ProjectsPage() {
  return (
    <AnimatedPage>
      <main className="min-h-screen">
        <ProductsClientsProjects />
      </main>
    </AnimatedPage>
  );
}

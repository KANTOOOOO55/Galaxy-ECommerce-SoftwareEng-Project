import { mockProducts } from '@/lib/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  // Simulate network delay within the 3-second SLA (800ms)
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const parameters = await params;
  const slug = parameters.slug.toLowerCase();

  const results = mockProducts.filter(p => p.category.toLowerCase() === slug);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-140px)]">
      <div className="mb-8 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border">
        <h1 className="text-4xl font-extrabold capitalize text-foreground">{slug.replace('-', ' ')}</h1>
        <p className="text-gray-500 mt-2 text-lg">Browse the best products in {slug}.</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {results.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center animate-in fade-in duration-300">
          <h2 className="text-2xl font-semibold mb-2">No Products Available</h2>
          <p className="text-gray-500">We currently do not have any products in this category.</p>
        </div>
      )}
    </div>
  );
}

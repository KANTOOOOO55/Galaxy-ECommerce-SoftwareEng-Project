import { mockProducts } from '@/lib/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  // Simulate network delay within the 2-second SLA (1000ms delay)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const params = await searchParams;
  const query = params.q?.toLowerCase() || '';

  const results = mockProducts.filter(p => 
    p.title.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-140px)]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        <p className="text-gray-500 mt-2">
          {query ? `Showing results for "${query}"` : 'Browse all products'}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
          {results.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center animate-in fade-in zoom-in duration-300">
          <div className="inline-flex justify-center items-center w-24 h-24 rounded-full bg-accent/10 text-accent mb-4">
            <span className="text-4xl text-inherit">🔍</span>
          </div>
          <h2 className="text-2xl font-semibold mb-2">No Results Found</h2>
          <p className="text-gray-500 max-w-md mx-auto">We couldn't find anything matching "{query}". Try checking your spelling or use more general terms.</p>
        </div>
      )}
    </div>
  );
}

import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SortOptions from '../components/SortOptions';
import Pagination from '../components/Pagination';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
}

interface PageResponse {
  content: Product[];
  totalPages: number;
  number: number;
}

type SearchParams = Promise<{ search?: string; category?: string; sort?: string; page?: string }>;

export default async function Home(props: { searchParams: SearchParams }) {
  
  const { search, category, sort, page } = await props.searchParams;

  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (category) params.append('category', category);
  if (sort) params.append('sort', sort);
  if (page) params.append('page', page);

  const url = `http://localhost:8081/api/products?${params.toString()}`;

  let products: Product[] = [];
  let totalPages = 0;
  let currentPage = 0;

  try {
      const response = await fetch(url, { cache: 'no-store' });
      if(response.ok) {
          const data: PageResponse = await response.json();
          products = data.content;
          totalPages = data.totalPages;
          currentPage = data.number;
      }
  } catch (error) {
      console.error("Failed to fetch products", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      
      <div className="pt-10 px-6 max-w-7xl mx-auto mb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {search ? `Results for "${search}"` : category ? `${category}` : "Our Collection"}
          </h1>
          <SortOptions />
        </div>
        <CategoryFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">No products found.</p>
          </div>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
      
    </div>
  );
}
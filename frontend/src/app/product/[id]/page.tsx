import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import ReviewSection from "../../../components/ReviewSection";
import ProductCard from "../../../components/ProductCard"; // Use "@/components/ProductCard" if this path fails

// Define types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stockQuantity: number;
}

// Define the shape of the paginated response
interface PageResponse {
  content: Product[];
  totalPages: number;
}

// Ensure params is treated as a Promise (Next.js 15 standard)
export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  console.log("--- DEBUGGING PRODUCT PAGE ---");
  console.log("Trying to load ID:", id);

  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  try {
    // 1. Fetch the Current Product (Single ID)
    const productRes = await fetch(`http://localhost:8081/api/products/${id}`, { cache: "no-store" });
    
    if (!productRes.ok) {
        console.log("Product not found. Status:", productRes.status);
        return notFound();
    }

    product = await productRes.json();
    console.log("Product found:", product?.name);

    // 2. Fetch a batch of products to find related ones
    // We ask for size=10 to get enough candidates for recommendations
    const allRes = await fetch('http://localhost:8081/api/products?size=10', { cache: "no-store" });
    const responseData = await allRes.json();

    // HANDLE PAGINATION: Check if data is inside ".content" or is a direct array
    // This supports both versions of your backend logic
    let allProducts: Product[] = [];
    
    if (Array.isArray(responseData)) {
        allProducts = responseData; // Old backend style
    } else if (responseData.content && Array.isArray(responseData.content)) {
        allProducts = responseData.content; // New Pagination style
    }

    // 3. Filter: Remove the current product, and take the first 3 others
    if (product && allProducts.length > 0) {
        const currentId = Number(product.id);
        relatedProducts = allProducts
            .filter((p) => Number(p.id) !== currentId)
            .slice(0, 3);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      
      {/* --- Main Product Section --- */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="h-96 md:h-[600px] bg-gray-100 relative">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-16 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              {product.price.toLocaleString()} FCFA
            </p>
            
            <div className="prose text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </div>

            <AddToCartButton product={product} />

            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block text-2xl">🚚</span>
                <span className="text-xs text-gray-500 font-bold mt-1">Fast Delivery</span>
              </div>
              <div>
                <span className="block text-2xl">🔒</span>
                <span className="text-xs text-gray-500 font-bold mt-1">Secure Payment</span>
              </div>
              <div>
                <span className="block text-2xl">↩️</span>
                <span className="text-xs text-gray-500 font-bold mt-1">Easy Returns</span>
              </div>
            </div>
            <ReviewSection productId={product.id} />
          </div>
        </div>
      </div>

      {/* --- Related Products Section --- */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
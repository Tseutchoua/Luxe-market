'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = ["All", "Clothing", "Footwear", "Accessories", "Electronics"];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';

  const handleCategoryChange = (category: string) => {
    if (category === 'All') {
      router.push('/'); // Clear filter
    } else {
      router.push(`/?category=${category}`); // Apply filter
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            currentCategory === cat
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
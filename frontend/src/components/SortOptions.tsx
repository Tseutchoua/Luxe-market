'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    
    // Create new URL parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    
    // Push new URL
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 font-medium">Sort by:</span>
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer outline-none hover:border-gray-400 transition"
      >
        <option value="newest">Newest Arrivals</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
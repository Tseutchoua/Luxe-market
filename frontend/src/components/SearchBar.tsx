'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize with the current URL query (so text doesn't disappear on refresh)
  const [term, setTerm] = useState(searchParams.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    if (term) {
      router.push(`/?search=${term}`); // Go to Home with query
    } else {
      router.push('/'); // Clear search
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block">
      <input
        type="text"
        placeholder="Search products..."
        className="bg-gray-100 text-gray-800 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
      >
        🔍
      </button>
    </form>
  );
}
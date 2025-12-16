'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      fetch(`http://localhost:8081/api/wishlist/${user.id}`)
        .then(res => res.json())
        .then(data => setItems(data.map((item: any) => item.product)));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 max-w-7xl mx-auto">My Wishlist</h1>
      
      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
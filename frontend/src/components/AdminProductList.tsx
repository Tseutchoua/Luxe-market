'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminProductList() {
  const [products, setProducts] = useState<any[]>([]);

  // Fetch all products (page 0, size 100 to see mostly everything)
  const refreshProducts = () => {
    fetch('http://localhost:8081/api/products?size=100')
      .then(res => res.json())
      .then(data => {
          // Handle both pagination and list formats
          if(data.content) setProducts(data.content);
          else setProducts(data);
      });
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`http://localhost:8081/api/products/${id}`, { method: 'DELETE' });
      toast.success('Product deleted');
      refreshProducts(); // Reload list
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Inventory</h2>
        <button onClick={refreshProducts} className="text-sm text-blue-600 hover:underline">Refresh List</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
              <th className="py-3">ID</th>
              <th className="py-3">Name</th>
              <th className="py-3">Price</th>
              <th className="py-3">Stock</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 text-gray-500">#{product.id}</td>
                <td className="py-4 font-bold text-gray-900">{product.name}</td>
                <td className="py-4 text-blue-600">{product.price.toLocaleString()} FCFA</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    product.stockQuantity === 0 ? 'bg-red-100 text-red-600' : 
                    product.stockQuantity < 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {product.stockQuantity}
                  </span>
                </td>
                <td className="py-4 text-right space-x-2">
                  <Link 
                    href={`/admin/edit/${product.id}`}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
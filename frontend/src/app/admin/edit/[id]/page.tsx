'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // Get ID from URL
  const { id } = params;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: ''
  });

  // Load existing data
  useEffect(() => {
    fetch(`http://localhost:8081/api/products/${id}`)
      .then(res => res.json())
      .then(data => setFormData({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category || '',
        stockQuantity: data.stockQuantity,
        imageUrl: data.imageUrl
      }))
      .catch(err => toast.error("Failed to load product"));
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Product Updated!');
        router.push('/admin'); // Go back to dashboard
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Product #{id}</h1>
        
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg" />
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg" rows={3}/>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Price</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-3 border rounded-lg" />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Stock</label>
              <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} className="w-full p-3 border rounded-lg" />
            </div>
            
            <div>
               <label className="block text-sm font-bold mb-2">Category</label>
               <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg bg-white">
                <option value="Clothing">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <div className="col-span-2">
               <label className="block text-sm font-bold mb-2">Image URL</label>
               <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-3 border rounded-lg" />
            </div>

            <div className="col-span-2 flex gap-4 mt-4">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
              <button type="button" onClick={() => router.push('/admin')} className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300">
                Cancel
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DashboardStats from '../../components/DashboardStats';
import AdminProductList from '../../components/AdminProductList';

export default function AdminPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    imageUrl: '' // This will be filled automatically after upload
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NEW: Handle File Selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append('file', file);

    setUploading(true);
    const loadingToast = toast.loading('Uploading image...');

    try {
      const res = await fetch('http://localhost:8081/api/images/upload', {
        method: 'POST',
        body: uploadData, // Send file directly
      });

      if (res.ok) {
        const url = await res.text(); // Backend returns the URL string
        setFormData({ ...formData, imageUrl: url }); // Save URL to form
        toast.success('Image Uploaded!');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Upload error');
    } finally {
      setUploading(false);
      toast.dismiss(loadingToast);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.imageUrl) {
        toast.error("Please upload an image first");
        return;
    }
    
    const loadingToast = toast.loading('Creating product...');

    try {
      const response = await fetch('http://localhost:8081/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success('Product Created Successfully! 🎉');
        // Reset form slightly to allow new entry
        setFormData({ ...formData, name: '', imageUrl: '' }); 
        router.refresh();
      } else {
        toast.error('Failed to add product');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('Error:', error);
      toast.error('Server connection failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <DashboardStats />

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-bold mb-6">Add New Inventory</h2>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input type="text" name="name" value={formData.name} required className="w-full p-3 border rounded-lg" onChange={handleChange} />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea name="description" value={formData.description} required className="w-full p-3 border rounded-lg" rows={3} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Price (FCFA)</label>
              <input type="number" name="price" value={formData.price} required className="w-full p-3 border rounded-lg" onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity</label>
              <input type="number" name="stockQuantity" value={formData.stockQuantity} required className="w-full p-3 border rounded-lg" onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
              <select name="category" value={formData.category} required className="w-full p-3 border rounded-lg bg-white" onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Image</label>
              
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-lg bg-gray-50 text-sm"
              />
              
              {uploading && <p className="text-xs text-blue-600 mt-1">Uploading...</p>}
              
              {/* Image Preview */}
              {formData.imageUrl && (
                  <div className="mt-2 relative h-20 w-20">
                      <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover rounded-md border" />
                  </div>
              )}
            </div>

            <div className="col-span-2">
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                Create Product
              </button>
            </div>

          </form>
        </div>

        <AdminProductList />

      </div>
    </div>
  );
}
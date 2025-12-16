'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  orderDate: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get User from Storage
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login'); // Protect the page
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // 2. Fetch Orders from Backend
    fetchOrders(parsedUser.email);
  }, []);

  const fetchOrders = async (email: string) => {
    try {
      const res = await fetch(`http://localhost:8081/api/orders/user/${email}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      toast.error("Could not load order history");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* User Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

        {loading ? (
          <p>Loading history...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition">
                <div>
                  <p className="font-bold text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {order.totalAmount.toLocaleString()} FCFA
                  </p>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
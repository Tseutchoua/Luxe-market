'use client';

import { useEffect, useState } from 'react';

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetch('http://localhost:8081/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Revenue</h3>
        <p className="text-2xl font-bold text-green-600 mt-2">
          {stats.totalRevenue.toLocaleString()} FCFA
        </p>
      </div>

      {/* Orders Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Orders</h3>
        <p className="text-2xl font-bold text-blue-600 mt-2">{stats.totalOrders}</p>
      </div>

      {/* Products Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Products</h3>
        <p className="text-2xl font-bold text-purple-600 mt-2">{stats.totalProducts}</p>
      </div>

      {/* Users Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 text-sm font-bold uppercase">Customers</h3>
        <p className="text-2xl font-bold text-orange-600 mt-2">{stats.totalUsers}</p>
      </div>
    </div>
  );
}
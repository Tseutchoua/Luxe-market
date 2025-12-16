'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">LuxeMarket</h3>
          <p className="text-sm leading-relaxed mb-4">
            The premium destination for high-quality fashion, sneakers, and accessories in Cameroon.
            Quality guaranteed.
          </p>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400 transition">All Products</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">New Arrivals</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Best Sellers</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Sneakers</Link></li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">FAQs</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:text-blue-400 transition">Returns</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Stay Updated</h4>
          <p className="text-xs mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <form className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 transition text-sm">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {new Date().getFullYear()} LuxeMarket Cameroon. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="cursor-pointer hover:text-white">Privacy Policy</span>
          <span className="cursor-pointer hover:text-white">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
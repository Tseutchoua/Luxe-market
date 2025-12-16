'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { cart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Check if user is logged in (Client-side only)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Delete user data
    setUser(null);
    setIsMenuOpen(false);
    router.push('/'); // Go home
    router.refresh(); // Refresh page to update UI
  };

  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
          LuxeMarket
        </Link>

        {/* Search Bar - Center */}
        <SearchBar /> 

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          
          {/* USER MENU LOGIC */}
          {user ? (
            <div className="relative">
              {/* User Name Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 font-medium text-gray-700 hover:text-black"
              >
                <span>👤 {user.name}</span>
                <span className="text-xs">▼</span>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-bold truncate">{user.email}</p>
                  </div>
                  
                  {/* Show Admin Link only if role is ADMIN */}
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/wishlist" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Wishlist ❤️
                  </Link>

                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If NOT logged in, show Login button
            <Link href="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
          )}

          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
        
      </div>
    </nav>
  );
}
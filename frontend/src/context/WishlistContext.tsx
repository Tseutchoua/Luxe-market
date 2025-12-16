'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface WishlistContextType {
  wishlistIds: number[];
  toggleWishlist: (product: any) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  // Load User and their Wishlist on startup
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchWishlist(parsedUser.id);
    }
  }, []);

  const fetchWishlist = async (userId: number) => {
    try {
      const res = await fetch(`http://localhost:8081/api/wishlist/${userId}`);
      if (res.ok) {
        const data = await res.json();
        // Extract just the product IDs
        const ids = data.map((item: any) => item.product.id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Failed to load wishlist");
    }
  };

  const toggleWishlist = async (product: any) => {
    if (!user) {
      toast.error("Please login to use Wishlist");
      return;
    }

    // Optimistic UI Update (Update screen immediately before server replies)
    const isLiked = wishlistIds.includes(product.id);
    if (isLiked) {
      setWishlistIds(prev => prev.filter(id => id !== product.id));
      toast('Removed from Wishlist', { icon: '💔' });
    } else {
      setWishlistIds(prev => [...prev, product.id]);
      toast('Added to Wishlist', { icon: '❤️' });
    }

    // Send to Server
    try {
      await fetch('http://localhost:8081/api/wishlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, productId: product.id }),
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
}
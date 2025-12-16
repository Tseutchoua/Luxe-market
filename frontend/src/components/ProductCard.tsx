'use client';

import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isLiked = wishlistIds.includes(product.id);
  const isOutOfStock = product.stockQuantity === 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 5;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${isOutOfStock ? 'opacity-75 grayscale-[0.5]' : ''}`}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
        >
          {isLiked ? '❤️' : '🤍'}
        </button>

        {/* Link wraps the image */}
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <motion.img 
            whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
            transition={{ duration: 0.3 }}
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </Link>
        
        {/* Quick Add Button - HIDDEN IF OUT OF STOCK */}
        {!isOutOfStock && (
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                }}
                className="pointer-events-auto bg-white text-black font-semibold py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg hover:bg-gray-100"
            >
                Quick Add
            </button>
            </div>
        )}

        {/* SOLD OUT OVERLAY */}
        {isOutOfStock && (
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                 <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-md transform -rotate-12 shadow-lg border-2 border-white">
                     SOLD OUT
                 </span>
             </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="text-xl font-extrabold text-blue-600">
            {product.price.toLocaleString()} FCFA
          </span>
          
          <div className="text-right">
             {isOutOfStock ? (
                 <span className="text-xs text-red-500 font-bold uppercase">Out of Stock</span>
             ) : (
                 <span className={`text-xs font-bold uppercase ${isLowStock ? 'text-orange-500 animate-pulse' : 'text-green-600'}`}>
                     {isLowStock ? `Only ${product.stockQuantity} left!` : 'In Stock'}
                 </span>
             )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
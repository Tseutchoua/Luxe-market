'use client';

import { useCart } from "../../../context/CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <button 
      onClick={() => addToCart(product)}
      disabled={isOutOfStock}
      className={`w-full md:w-auto px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all
        ${isOutOfStock 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-black text-white hover:bg-gray-800 active:scale-95'
        }`}
    >
      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
}
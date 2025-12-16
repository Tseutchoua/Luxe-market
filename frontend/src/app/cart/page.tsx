'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();
  
  // NEW STATE FOR COUPONS
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Calculate Final Price
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = cartTotal - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    const loadingToast = toast.loading('Checking code...');

    try {
      const res = await fetch('http://localhost:8081/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode }),
      });

      toast.dismiss(loadingToast);

      if (res.ok) {
        const data = await res.json();
        setDiscountPercent(data.discountPercentage);
        toast.success(`Coupon Applied! ${data.discountPercentage}% OFF`);
      } else {
        setDiscountPercent(0);
        toast.error('Invalid Coupon Code');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Could not validate coupon');
    }
  };

  const handleCheckout = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
        toast.error("Please login to checkout!");
        return;
    }
    const user = JSON.parse(storedUser);

    try {
    // 1. Save Order (With Final Price)
    await fetch('http://localhost:8081/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        userEmail: user.email,
        totalAmount: finalTotal, // <--- Send Discounted Price
        status: 'PENDING' 
        }),
    });

    // 2. Stripe Checkout
    // NOTE: In a real app, we would tell the backend to apply the discount to Stripe too.
    // For this tutorial, we will just send the items. 
    // (Stripe will show the full price visually, but we recorded the discounted price in our DB).
    const response = await fetch('http://localhost:8081/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
    });

    const paymentUrl = await response.text();
    window.location.href = paymentUrl;

    } catch (error) {
    console.error("Payment Error:", error);
    toast.error("Something went wrong.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shopping Cart</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: ITEMS (Takes up 2 columns) */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <div className="flex-grow">
                <h2 className="font-bold text-gray-900">{item.name}</h2>
                <p className="text-gray-500 text-sm">{item.price.toLocaleString()} FCFA x {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm font-bold hover:underline">
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: SUMMARY (Takes up 1 column) */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>{cartTotal.toLocaleString()} FCFA</span>
          </div>

          {discountPercent > 0 && (
            <div className="flex justify-between mb-2 text-green-600 font-medium">
              <span>Discount ({discountPercent}%)</span>
              <span>- {discountAmount.toLocaleString()} FCFA</span>
            </div>
          )}

          <div className="border-t border-gray-100 my-4 pt-4 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{finalTotal.toLocaleString()} FCFA</span>
          </div>

          {/* COUPON INPUT */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Promo Code" 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm uppercase focus:outline-none focus:border-blue-500"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
              <button 
                onClick={handleApplyCoupon}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-black transition"
              >
                Apply
              </button>
            </div>
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg disabled:opacity-50"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewSection({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState<any>(null);

  // Load User & Reviews
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    fetch(`http://localhost:8081/api/reviews/${productId}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }

    const reviewData = {
      productId,
      userName: user.name,
      rating,
      comment: newComment
    };

    try {
      const res = await fetch('http://localhost:8081/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        const savedReview = await res.json();
        setReviews([savedReview, ...reviews]); // Add to list instantly
        setNewComment('');
        toast.success('Review added!');
      }
    } catch (error) {
      toast.error('Failed to post review');
    }
  };

  return (
    <div className="mt-16 border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews ({reviews.length})</h2>

      {/* Review Form */}
      <div className="bg-gray-50 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))}
              className="border rounded p-2 w-full max-w-xs"
            >
              <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (Good)</option>
              <option value="3">⭐⭐⭐ (Average)</option>
              <option value="2">⭐⭐ (Poor)</option>
              <option value="1">⭐ (Bad)</option>
            </select>
          </div>
          <div>
            <textarea 
              placeholder="Write your thoughts..." 
              required
              className="w-full border rounded p-3 focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
            Post Review
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-900">{review.userName}</p>
                  <div className="text-yellow-400 text-sm">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
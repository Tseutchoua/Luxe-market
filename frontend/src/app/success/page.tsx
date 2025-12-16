import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
      <p className="text-gray-700 mb-8">Thank you for your purchase.</p>
      <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Return to Store
      </Link>
    </div>
  );
}
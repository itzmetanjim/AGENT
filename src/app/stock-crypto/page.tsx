import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StockAndCryptoGPT() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">
          <div className="w-12 h-12 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <h1 className="text-xl font-bold mb-2">Stock & Crypto GPT</h1>
          <p className="text-gray-600 mb-6">
            This GPT is under construction. Stay tuned for live stock & crypto AI soon!
          </p>
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Go Back to Home
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}

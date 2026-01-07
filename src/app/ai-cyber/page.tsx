import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AIAndCyberGPT() {
  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-xl shadow text-center max-w-md w-full">
          <div className="w-12 h-12 mx-auto border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
          <h1 className="text-xl font-bold mb-2">AI Cybersecurity GPT</h1>
          <p className="text-gray-600 mb-6">
            Our AI Cyber GPT is under construction. Check back soon for AI-powered security tools!
          </p>
          <Link href="/" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Go Back to Home
          </Link>
        </div>
      </main>
    </ProtectedRoute>
  );
}

// app/login/page.tsx
// 🚪 THE FRONT DOOR

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../../src/lib/firebase/authService";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    console.log("🔑 Trying to unlock the door...");
    
    const result = await authService.login(email, password);
    
    if (result.success) {
      console.log("🎉 Door unlocked! Going to secret room...");
      router.push("/admin");
    } else {
      console.log("❌ Wrong password! Try again!");
      setError(result.error || "Login failed");
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        {/* Clubhouse Sign */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏠 Explorer Luang Prabang
          </h1>
          <p className="text-gray-600">Enter the secret password to unlock</p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ❌ {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "🔄 Checking password..." : "🔓 Unlock the Door"}
          </button>
        </form>

        {/* Helpful Hint */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔑 Only members with the secret password can enter</p>
        </div>
      </div>
    </div>
  );
}
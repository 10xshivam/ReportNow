// pages/auth/signin.tsx
'use client'
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirection
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect manually after successful sign-in
      window.location.href = "/dashboard";
    }
  };

  const [providers, setProviders] = useState<Record<string, { id: string; name: string }> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white/10 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center ">Sign In</h1>

        {/* Google Sign-In Button */}
        {providers?.google && (
          <div className="mt-4">
            <button
              onClick={() => signIn(providers.google.id)}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Sign in with Google
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">Or sign in with email</span>
          </div>
        </div>

        {/* Credentials Provider Form */}
        <form onSubmit={handleCredentialSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Sign in with Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

/**
 * Example Authentication Components
 * These are example components showing how to use the auth system
 * 
 * Usage:
 * 1. Copy and adapt these components to your project
 * 2. Update the styling to match your design
 * 3. Add error handling and loading states as needed
 */

"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

/**
 * Login Component Example
 */
export function LoginComponent() {
  const { login, isLoading, error, clearError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (!username || !password) {
      setLocalError("Please enter username and password");
      return;
    }

    try {
      await login(username, password);
      // Redirect to dashboard or home page
      // router.push("/app");
    } catch {
      setLocalError(error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {(error || localError) && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error || localError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

/**
 * Signup Component Example
 */
export function SignupComponent() {
  const { signup, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);

    if (!email || !username || !password || !confirmPassword) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await signup(email, username, password);
      // Redirect to login or dashboard
      // router.push("/login");
    } catch {
      setLocalError(error || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Choose a username"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {(error || localError) && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error || localError}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}

/**
 * User Profile Component Example
 */
export function UserProfileComponent() {
  const { user, isLoggedIn, logout, isLoading } = useAuth();

  if (!isLoggedIn || !user) {
    return <p>Not logged in</p>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home or login
      // router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">User Profile</h2>

      <div className="space-y-2 mb-4">
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Status:</strong> {user.is_active ? "Active" : "Inactive"}
        </p>
        <p>
          <strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

/**
 * Protected Route Component Example
 * Use this to protect routes that require authentication
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <div>Please log in to access this page</div>;
  }

  return <>{children}</>;
}

/**
 * Example: Login Page
 */
export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <LoginComponent />
        <p className="mt-4 text-center">
          Don&apos;t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
        </p>
      </div>
    </div>
  );
}

/**
 * Example: Signup Page
 */
export function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6">Create Account</h1>
        <SignupComponent />
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </div>
    </div>
  );
}

/**
 * useAuth Hook
 * Provides authentication state and methods for the frontend
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import { apiClient, type User, type AuthResponse } from "@/lib/api-client";

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  signup: (email: string, username: string, password: string) => Promise<User>;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signup = useCallback(
    async (email: string, username: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const newUser = await apiClient.signup(email, username, password);
        setUser(newUser);
        return newUser;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Signup failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.login(username, password);
        setUser(response.user);
        setToken(response.access_token);
        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await apiClient.logout();
      setUser(null);
      setToken(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Logout failed";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    token,
    isLoading,
    error,
    isLoggedIn: !!token && !!user,
    signup,
    login,
    logout,
    clearError,
  };
}

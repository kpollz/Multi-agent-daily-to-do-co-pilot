/**
 * API Client for Frontend
 * Handles communication with FastAPI backend
 * Uses relative URLs so it works across all environments
 */

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

class APIClient {
  private token: string | null = null;

  constructor() {
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("access_token");
    }
  }

  private saveToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  }

  private clearToken() {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  }

  private async request(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: unknown,
    useBasicAuth: boolean = false,
    username?: string,
    password?: string
  ) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    let basicAuth = "";
    if (useBasicAuth && username && password) {
      basicAuth = "Basic " + btoa(`${username}:${password}`);
      headers["Authorization"] = basicAuth;
    } else if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `API Error: ${response.status}`);
    }

    return response.json();
  }

  // Health check
  async healthCheck() {
    return this.request("/api/health");
  }

  // Auth endpoints
  async signup(email: string, username: string, password: string) {
    return this.request("/api/auth/signup", "POST", {
      email,
      username,
      password,
    });
  }

  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await this.request("/api/auth/login", "POST", {
      username,
      password,
    });
    this.saveToken(response.access_token);
    return response;
  }

  async getCurrentUser(username: string, password: string): Promise<User> {
    return this.request(
      "/api/auth/me",
      "GET",
      undefined,
      true,
      username,
      password
    );
  }

  async logout() {
    this.clearToken();
    return this.request("/api/auth/logout", "POST");
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}

export const apiClient = new APIClient();
export type { AuthResponse, User };

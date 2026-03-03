import React, { createContext, useContext, useState, useCallback } from "react";

export type PlanTier = "basic" | "professional" | "enterprise";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  plan: PlanTier;
  businessName: string;
  branch: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const SAMPLE_USERS: Record<string, { password: string; user: User }> = {
  "basic@poscloud.com": {
    password: "basic123",
    user: {
      id: "u1",
      email: "basic@poscloud.com",
      name: "Sarah Chen",
      role: "Owner",
      plan: "basic",
      businessName: "Corner Café",
      branch: "Main Store",
    },
  },
  "pro@poscloud.com": {
    password: "pro123",
    user: {
      id: "u2",
      email: "pro@poscloud.com",
      name: "Marcus Rivera",
      role: "Admin",
      plan: "professional",
      businessName: "Urban Threads",
      branch: "Downtown HQ",
    },
  },
  "enterprise@poscloud.com": {
    password: "enterprise123",
    user: {
      id: "u3",
      email: "enterprise@poscloud.com",
      name: "Aisha Patel",
      role: "Super Admin",
      plan: "enterprise",
      businessName: "MegaMart Group",
      branch: "Regional Office",
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem("pos_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string) => {
    const entry = SAMPLE_USERS[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      sessionStorage.setItem("pos_user", JSON.stringify(entry.user));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("pos_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const SAMPLE_CREDENTIALS = [
  { label: "Basic", email: "basic@poscloud.com", password: "basic123", color: "text-chart-3" },
  { label: "Professional", email: "pro@poscloud.com", password: "pro123", color: "text-chart-2" },
  { label: "Enterprise", email: "enterprise@poscloud.com", password: "enterprise123", color: "text-chart-4" },
];


import React, { createContext, useContext, useState, useEffect } from "react";

// Mock data for student information
const mockStudent = {
  id: "S123456",
  name: "John Doe",
  regNumber: "UNI/2023/001",
  email: "john.doe@university.edu",
  role: "student" as const,
  semester: "Fall 2023",
};

// Mock data for invigilator
const mockInvigilator = {
  id: "I789012",
  name: "Dr. Jane Smith",
  email: "jane.smith@university.edu",
  role: "invigilator" as const,
};

// Mock data for admin
const mockAdmin = {
  id: "A456789",
  name: "Admin User",
  email: "admin@university.edu",
  role: "admin" as const,
};

// Types
interface User {
  id: string;
  name: string;
  regNumber?: string;
  email: string;
  role: "student" | "admin" | "invigilator";
  semester?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: "student" | "admin" | "invigilator") => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: "student" | "admin" | "invigilator" = "student") => {
    try {
      setLoading(true);
      
      // In a real app, you would validate credentials with your backend
      // and get a JWT token
      
      // For now, we'll simulate a successful login with mock data
      if (email && password) {
        // Mock login based on role (replace with actual API call)
        let userData;
        switch (role) {
          case "student":
            userData = mockStudent;
            break;
          case "invigilator":
            userData = mockInvigilator;
            break;
          case "admin":
            userData = mockAdmin;
            break;
          default:
            userData = mockStudent;
        }
        
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

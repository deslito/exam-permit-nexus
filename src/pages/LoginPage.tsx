
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { School } from "lucide-react";

const LoginPage = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }
    
    try {
      setIsLoggingIn(true);
      await login(email, password);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-university-primary/10 to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-university-primary flex items-center justify-center">
              <School className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Exam Permit System</h1>
          <p className="text-muted-foreground">Sign in to access your exam permits</p>
        </div>
        
        <div className="neuro-card p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-university-secondary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-university-primary hover:bg-university-primary/90 neuro-button"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-university-secondary hover:underline"
              >
                Contact your administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

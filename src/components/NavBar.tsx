
import React from "react";
import { Link } from "react-router-dom";
import { Home, CreditCard, User, History, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface NavBarProps {
  userRole?: "student" | "admin" | "invigilator";
}

const NavBar = ({ userRole = "student" }: NavBarProps) => {
  const getNavItems = (): NavItem[] => {
    switch (userRole) {
      case "student":
        return [
          { label: "Dashboard", icon: <Home className="w-5 h-5" />, href: "/" },
          { label: "Permit", icon: <CreditCard className="w-5 h-5" />, href: "/permit" },
          { label: "History", icon: <History className="w-5 h-5" />, href: "/history" },
          { label: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
        ];
      case "admin":
        // Admin nav items here when implementing admin role
        return [];
      case "invigilator":
        // Invigilator nav items here when implementing invigilator role
        return [];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </div>
    </nav>
  );
};

const NavItem = ({ item }: { item: NavItem }) => {
  // Check if this is the active route
  const isActive = window.location.pathname === item.href;

  return (
    <Link
      to={item.href}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {item.icon}
      <span className="text-xs mt-1">{item.label}</span>
    </Link>
  );
};

export default NavBar;

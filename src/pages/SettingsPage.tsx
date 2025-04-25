import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="flex min-h-screen">
      {isAdmin && <AdminSidebar />}
      <div className={`flex-1 p-4 md:p-6 ${isAdmin ? 'md:ml-64 pt-16 md:pt-6' : ''}`}>
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        {/* Settings content */}
      </div>
    </div>
  );
};

export default SettingsPage;

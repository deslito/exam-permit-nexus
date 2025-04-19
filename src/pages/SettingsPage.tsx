
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import AdminSidebar from "@/components/AdminSidebar";

const SettingsPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-background">
      {isAdmin && <AdminSidebar />}
      <div className={isAdmin ? "md:pl-64" : ""}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <Card className="p-4">
            <p className="text-muted-foreground">
              Settings functionality coming soon...
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

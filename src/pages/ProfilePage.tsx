
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import { Edit2, LogOut } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Profile" />

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-24 h-24 rounded-full bg-university-primary text-white flex items-center justify-center text-3xl font-bold">
            {user?.name.charAt(0)}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.regNumber}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 neuro-button"
            onClick={() => toast.info("Edit profile coming soon")}
          >
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Personal Information</h3>
          <div className="neuro-card p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Name</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Registration Number</span>
              <span>{user?.regNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Semester</span>
              <span>{user?.semester}</span>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Academic Information</h3>
          <div className="neuro-card p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Program</span>
              <span>Bachelor of Computer Science</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Year</span>
              <span>3rd Year</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            variant="outline"
            className="w-full text-permit-expired neuro-button"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default ProfilePage;

import React from "react";
import AdminSidebar from "@/components/AdminSidebar";

const ManagePermitsPage = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-6 md:ml-64 pt-16 md:pt-6">
        <h1 className="text-2xl font-bold mb-6">Manage Permits</h1>
        {/* Permit management content */}
      </div>
    </div>
  );
};

export default ManagePermitsPage;

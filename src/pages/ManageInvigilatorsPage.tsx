
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

const ManageInvigilatorsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Invigilators</h1>
            <Button onClick={() => console.log("Add new invigilator")}>
              <Plus className="w-4 h-4 mr-2" /> Add Invigilator
            </Button>
          </div>

          <Card className="p-4">
            <p className="text-muted-foreground">
              Invigilator management functionality coming soon...
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManageInvigilatorsPage;

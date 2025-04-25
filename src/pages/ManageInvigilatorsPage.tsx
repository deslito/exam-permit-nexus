
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import InvigilatorManagement from "@/components/InvigilatorManagement";
import type { Invigilator } from "@/types/academic";

const ManageInvigilatorsPage = () => {
  const [invigilators, setInvigilators] = useState<Invigilator[]>([
    {
      id: "1",
      name: "Dr. Roy Desire",
      email: "john.doe@kyu.ac.ug",
      phoneNumber: "+256 700 123456",
      staffId: "STAFF001",
      schoolId: "SCH001",
      school: {
        id: "SCH001",
        name: "School of Computing & Information Science",
        facultyId: "FAC001",
        courses: []
      },
      status: "ACTIVE"
    },
    {
      id: "2",
      name: "Prof. Jane Smith",
      email: "jane.smith@kyu.ac.ug",
      phoneNumber: "+256 700 789012",
      staffId: "STAFF002",
      schoolId: "SCH002",
      school: {
        id: "SCH002",
        name: "School of Engineering",
        facultyId: "FAC002",
        courses: []
      },
      status: "ACTIVE"
    }
  ]);

  const handleAddInvigilator = (invigilator: Omit<Invigilator, 'id'>) => {
    // In a real application, this would be an API call to Supabase
    const newInvigilator = {
      ...invigilator,
      id: Math.random().toString(36).substr(2, 9),
    };
    setInvigilators([...invigilators, newInvigilator]);
  };

  const handleUpdateInvigilator = (id: string, data: Partial<Invigilator>) => {
    // In a real application, this would be an API call to Supabase
    setInvigilators(invigilators.map(invig => 
      invig.id === id ? { ...invig, ...data } : invig
    ));
  };

  const handleDeleteInvigilator = (id: string) => {
    // In a real application, this would be an API call to Supabase
    setInvigilators(invigilators.filter(invig => invig.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64">
        <div className="p-4">
          <InvigilatorManagement 
            invigilators={invigilators}
            onAddInvigilator={handleAddInvigilator}
            onUpdateInvigilator={handleUpdateInvigilator}
            onDeleteInvigilator={handleDeleteInvigilator}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageInvigilatorsPage;

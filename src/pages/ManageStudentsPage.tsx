
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

// Mock student data
const mockStudents = [
  {
    id: "S123456",
    name: "John Doe",
    regNumber: "UNI/2023/001",
    email: "john.doe@university.edu",
    permitStatus: "VALID",
  },
  {
    id: "S234567",
    name: "Jane Smith",
    regNumber: "UNI/2023/002",
    email: "jane.smith@university.edu",
    permitStatus: "PENDING",
  },
  {
    id: "S345678",
    name: "Bob Johnson",
    regNumber: "UNI/2023/003",
    email: "bob.johnson@university.edu",
    permitStatus: "EXPIRED",
  },
];

const ManageStudentsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    if (searchTerm) {
      const filteredStudents = mockStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.regNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStudents(filteredStudents);
    } else {
      setStudents(mockStudents);
    }
  };

  const handleAddStudent = () => {
    toast.info("Add student modal would open here");
  };

  const handleEditStudent = (id: string) => {
    toast.info(`Edit student ${id} modal would open here`);
  };

  const handleDeleteStudent = (id: string) => {
    toast.info(`Delete confirmation for student ${id} would show here`);
  };
  
  // Get color for permit status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case "VALID": return "bg-green-500";
      case "PENDING": return "bg-amber-500";
      case "EXPIRED": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Students</h1>
          <Button onClick={handleAddStudent} size="sm" className="flex items-center">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name or reg number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
        
        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.id} className="p-4 neuro-card">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{student.name}</div>
                  <div className="text-sm text-muted-foreground mb-1">{student.regNumber}</div>
                  <div className="text-sm">{student.email}</div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Badge className={getStatusColor(student.permitStatus)}>
                    {student.permitStatus}
                  </Badge>
                  <div className="flex space-x-2 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStudent(student.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-destructive"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {students.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No students found. Try a different search term.
            </div>
          )}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default ManageStudentsPage;

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/AdminSidebar";
import StudentCard from "@/components/students/StudentCard";
import SearchBar from "@/components/students/SearchBar";

const mockStudents = [
  {
    id: "S123456",
    name: "Asiimire Tracy",
    regNumber: "23/U/DCE/04387/PD",
    email: "asiimiretracy@gmail.com",
    permitStatus: "INVALID"
  },
  {
    id: "S234567",
    name: "Muyingo Cynthia",
    regNumber: "21/U/ARC/38005/PD",
    email: "muyingocynthia@gmail.com",
    permitStatus: "VALID"
  },
  {
    id: "S345678",
    name: "Mubiru Timothy",
    regNumber: "21/U/ITD/3925/PD",
    email: "mubirutimothy@gmail.com",
    permitStatus: "VALID"
  },
  {
    id: "S456789",
    name: "Twijukye David",
    regNumber: "21/U/BBA/3345/PD",
    email: "twijukyedavid@gmail.com",
    permitStatus: "VALID"
  }
];

const ManageStudentsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(mockStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    regNumber: "",
    role: "student",
    password: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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
    setIsAddDialogOpen(true);
  };

  const handleEditStudent = (id: string) => {
    const student = mockStudents.find(student => student.id === id);
    if (student) {
      setCurrentStudent(student);
      setNewUser({
        name: student.name,
        email: student.email,
        regNumber: student.regNumber,
        role: "student",
        password: "",
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleDeleteStudent = (id: string) => {
    toast.info(`Delete confirmation for student ${id} would show here`);
  };
  
  const handleCreateAccount = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (newUser.role === "student" && !newUser.regNumber) {
      toast.error("Registration number is required for students");
      return;
    }
    
    toast.success(`Account created for ${newUser.name} as ${newUser.role}`);
    
    setNewUser({
      name: "",
      email: "",
      regNumber: "",
      role: "student",
      password: "",
    });
    setIsAddDialogOpen(false);
  };
  
  const handleUpdateAccount = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (newUser.role === "student" && !newUser.regNumber) {
      toast.error("Registration number is required for students");
      return;
    }
    
    toast.success(`Account updated for ${newUser.name}`);
    
    setNewUser({
      name: "",
      email: "",
      regNumber: "",
      role: "student",
      password: "",
    });
    setIsEditDialogOpen(false);
    setCurrentStudent(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VALID": return "bg-green-500";
      case "PENDING": return "bg-amber-500";
      case "EXPIRED": return "bg-destructive";
      case "INVALID": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64">
        <div className="bg-gradient-to-r from-university-blue to-university-blue/80 text-white p-6 relative">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">Manage Students</h1>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <SearchBar 
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value)}
                />
              </div>
              <Button 
                onClick={handleAddStudent} 
                size="sm" 
                className="flex items-center glass-morphic hover:bg-white/20"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Student
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
              />
            ))}
            
            {students.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No students found. Try a different search term.
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Student Account</DialogTitle>
            <DialogDescription>
              Create a new student account with login credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Asiimire Tracy"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="student@kyu.edu"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="regNumber">Registration Number</Label>
              <Input
                id="regNumber"
                value={newUser.regNumber}
                onChange={(e) => setNewUser({ ...newUser, regNumber: e.target.value })}
                placeholder="XX/U/XXX/XXXXX/XX"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAccount}>Create Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student Account</DialogTitle>
            <DialogDescription>
              Update the student's account information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-regNumber">Registration Number</Label>
              <Input
                id="edit-regNumber"
                value={newUser.regNumber}
                onChange={(e) => setNewUser({ ...newUser, regNumber: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-password">Change Password</Label>
              <Input
                id="edit-password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setCurrentStudent(null);
            }}>Cancel</Button>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageStudentsPage;

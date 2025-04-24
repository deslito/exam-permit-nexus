
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import type { Invigilator } from "@/types/academic";

const ManageInvigilatorsPage = () => {
  const [invigilators, setInvigilators] = useState<Invigilator[]>([
    {
      id: "1",
      name: "Dr. John Doe",
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
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddInvigilator = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add invigilator logic here
    toast.success("Invigilator added successfully");
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="md:pl-64">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-university-blue">Manage Invigilators</h1>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-university-green hover:bg-university-green/90">
                  <Plus className="w-4 h-4 mr-2" /> Add Invigilator
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Invigilator</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddInvigilator} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Dr. John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@kyu.ac.ug"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="+256 700 123456"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffId">Staff ID</Label>
                    <Input id="staffId" placeholder="STAFF001" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School/Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sch001">
                          School of Computing & Information Science
                        </SelectItem>
                        <SelectItem value="sch002">
                          School of Engineering
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-university-green hover:bg-university-green/90">
                      Add Invigilator
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader className="bg-university-blue/5">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>School/Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invigilators.map((invigilator) => (
                  <TableRow key={invigilator.id}>
                    <TableCell className="font-medium">{invigilator.name}</TableCell>
                    <TableCell>{invigilator.staffId}</TableCell>
                    <TableCell>{invigilator.school.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{invigilator.email}</p>
                        <p className="text-muted-foreground">
                          {invigilator.phoneNumber}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invigilator.status === "ACTIVE"
                            ? "bg-university-green/10 text-university-green"
                            : "bg-university-orange/10 text-university-orange"
                        }`}
                      >
                        {invigilator.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("Edit functionality coming soon")}
                        >
                          <Edit className="w-4 h-4 text-university-blue" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.info("Delete functionality coming soon")}
                        >
                          <Trash className="w-4 h-4 text-university-orange" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageInvigilatorsPage;

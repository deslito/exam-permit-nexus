
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { QrCode, Upload } from "lucide-react";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import PermitCard from "@/components/PermitCard";

const ScanQRPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const [lastScannedPermit, setLastScannedPermit] = useState<any>(null);

  // Mock scan function - replace with actual QR scanning logic
  const handleScan = () => {
    setScanning(true);
    setIsDrawerOpen(true);
    
    // Simulate QR code scanning with mock data
    setTimeout(() => {
      setScanning(false);
      
      // Mock student data - replace with actual API call to Supabase
      const mockStudentData: StudentData = {
        id: "S123456",
        name: "Asiimire Tracy",
        regNumber: "23/U/DCE/04387/PD",
        course: "Bachelor of Computer Science",
        semester: "Year 2 Semester I",
        feesBalance: 0,
        permitStatus: "VALID"
      };
      
      const mockPermit = {
        id: "PERM-123456",
        studentName: mockStudentData.name,
        studentNumber: "2023/HD/1234",
        regNumber: mockStudentData.regNumber,
        gender: "Male",
        yearOfStudy: 2,
        campus: "Main Campus",
        semester: "I" as const,
        academicYear: "2023/2024",
        faculty: "Science and Technology",
        department: "Computer Science",
        programme: "Bachelor of Computer Science",
        courseUnits: [
          {
            code: "CSC 201",
            name: "Data Structures",
            creditUnits: 4,
            category: "CORE",
            status: "NORMAL"
          }
        ],
        examDate: "May 15, 2025",
        status: "valid" as const,
        photoUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        printDate: new Date().toISOString()
      };
      
      setLastScannedPermit(mockPermit);
      navigate("/student-details", { state: { studentData: mockStudentData } });
      toast.success("QR Code scanned successfully!");
    }, 2000);
  };

  const handleUploadImage = () => {
    toast.info("File upload feature coming soon");
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">QR Code Scanner</h1>
        
        {lastScannedPermit && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Last Scanned Permit</h2>
            <div className="bg-white rounded-lg p-4 shadow border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{lastScannedPermit.studentName}</p>
                  <p className="text-sm text-muted-foreground">{lastScannedPermit.regNumber}</p>
                  <div className="mt-1">
                    <Badge status={lastScannedPermit.status} />
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => navigate("/student-details", { state: { studentData: { name: lastScannedPermit.studentName, regNumber: lastScannedPermit.regNumber, feesBalance: 0, permitStatus: "VALID" } } })}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-8 aspect-square max-w-xs mx-auto border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center">
            {scanning ? (
              <div className="text-center space-y-2">
                <div className="animate-pulse">
                  <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                </div>
                <p>Scanning...</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-sm">Camera preview will appear here</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleScan} 
              disabled={scanning}
              className="w-full bg-university-blue hover:bg-university-blue/80"
            >
              {scanning ? "Scanning..." : "Start Scanning"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleUploadImage}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload QR Image
            </Button>
          </div>
        </div>
        
        {/* Upcoming Exams Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Upcoming Exams</h2>
          <div className="bg-white rounded-lg p-4 shadow border">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">CSC 201: Data Structures</p>
                <p className="text-sm text-muted-foreground">Today, 10:00 AM - Room B12</p>
              </div>
              <Badge status="scheduled" />
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 shadow border">
              <p className="font-medium">CSC 101: Introduction to Computing</p>
              <p className="text-sm text-muted-foreground">Completed • May 20, 2023</p>
              <div className="mt-1">
                <Badge status="completed" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow border">
              <p className="font-medium">MTH 102: Calculus II</p>
              <p className="text-sm text-muted-foreground">Completed • May 18, 2023</p>
              <div className="mt-1">
                <Badge status="completed" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className={isMobile ? "h-[85%]" : ""}>
          <DrawerHeader>
            <DrawerTitle>Scan Results</DrawerTitle>
          </DrawerHeader>
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      <NavBar />
    </div>
  );
};

const Badge = ({ status }: { status: string }) => {
  let classes = "px-2 py-1 rounded-full text-xs font-medium";
  
  switch (status) {
    case "valid":
    case "completed":
      classes += " bg-green-100 text-green-800";
      break;
    case "pending":
    case "scheduled":
      classes += " bg-blue-100 text-blue-800";
      break;
    case "expired":
      classes += " bg-red-100 text-red-800";
      break;
    default:
      classes += " bg-gray-100 text-gray-800";
  }
  
  return <span className={classes}>{status.toUpperCase()}</span>;
};

export default ScanQRPage;

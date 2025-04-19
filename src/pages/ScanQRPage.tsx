
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

const ScanQRPage = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

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
        name: "John Doe",
        regNumber: "UNI/2023/001",
        course: "Bachelor of Computer Science",
        semester: "Fall 2023",
        feesBalance: 500,
        permitStatus: "VALID"
      };
      
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
              className="w-full"
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

export default ScanQRPage;

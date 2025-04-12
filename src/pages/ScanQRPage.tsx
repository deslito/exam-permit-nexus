
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { QrCode, Upload } from "lucide-react";
import NavBar from "@/components/NavBar";

const ScanQRPage = () => {
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [studentInfo, setStudentInfo] = useState<null | {
    name: string;
    regNumber: string;
    status: "VALID" | "EXPIRED" | "INVALID";
  }>(null);

  const handleScan = () => {
    setScanning(true);
    
    // Mock QR code scanning - in real app, use a camera library
    setTimeout(() => {
      // Simulate successful scan
      setScanning(false);
      setResult("S123456-UNI/2023/001-VALID");
      
      // Parse the data (in real app, this would come from the QR code)
      setStudentInfo({
        name: "John Doe",
        regNumber: "UNI/2023/001",
        status: "VALID"
      });
      
      toast.success("QR Code scanned successfully!");
    }, 2000);
  };

  const handleUploadImage = () => {
    // Mock file upload logic
    toast.info("File upload feature would be implemented here");
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
            ) : result ? (
              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 mx-auto text-primary" />
                <p className="text-sm">Scan completed</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-sm">Camera preview will appear here</p>
              </div>
            )}
          </div>
          
          {studentInfo && (
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">Scan Result</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{studentInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reg Number:</span>
                  <span className="font-medium">{studentInfo.regNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`font-medium ${
                    studentInfo.status === "VALID"
                      ? "text-green-500"
                      : studentInfo.status === "EXPIRED"
                      ? "text-amber-500"
                      : "text-red-500"
                  }`}>
                    {studentInfo.status}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={handleScan} 
              disabled={scanning}
              className="w-full"
            >
              {scanning ? "Scanning..." : "Start Scanning"}
            </Button>
            
            <div className="relative">
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
      </div>
      <NavBar />
    </div>
  );
};

export default ScanQRPage;

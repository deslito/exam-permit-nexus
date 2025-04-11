
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PermitCard from "@/components/PermitCard";
import { Download, Printer, Share2 } from "lucide-react";
import { toast } from "sonner";

const PermitPage = () => {
  const { user } = useAuth();
  const [isSharing, setIsSharing] = useState(false);
  
  // Mock permit data
  const permitData = {
    id: "PERM-123456",
    studentName: user?.name || "John Doe",
    regNumber: user?.regNumber || "UNI/2023/001",
    semester: user?.semester || "Fall 2023",
    courseName: "Advanced Mathematics",
    examDate: "May 15, 2023",
    status: "valid" as const, // valid, pending, or expired
  };

  const handleDownload = () => {
    toast.success("Permit downloaded successfully!");
    // In a real app, we would generate a downloadable PDF
  };

  const handlePrint = () => {
    toast.success("Printing permit...");
    // In a real app, we would open the print dialog
    window.print();
  };

  const handleShare = () => {
    setIsSharing(true);
    
    // In a real app, we would integrate with the device's sharing functionality
    setTimeout(() => {
      toast.success("Permit link copied to clipboard!");
      setIsSharing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Exam Permit" />

      <div className="p-4 space-y-6">
        <div className="mb-6">
          <h2 className="text-center text-lg font-semibold text-university-primary">
            Your Examination Permit
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Present this permit to the invigilator before the exam
          </p>
        </div>

        {/* Permit Card */}
        <div className="flex justify-center">
          <PermitCard
            permitData={permitData}
            className="max-w-md shadow-lg animate-fade-in"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 neuro-button"
            onClick={handleShare}
            disabled={isSharing}
          >
            <Share2 className="w-4 h-4 mr-1" /> Share
          </Button>
        </div>

        {/* Permit Details */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Permit Details</h3>
          <div className="neuro-card p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Permit ID</span>
              <span className="font-medium">{permitData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exam Date</span>
              <span className="font-medium">{permitData.examDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Course</span>
              <span className="font-medium">{permitData.courseName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Semester</span>
              <span className="font-medium">{permitData.semester}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4">
          <h3 className="font-semibold mb-3">Instructions</h3>
          <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
            <p>• Present this permit along with your student ID</p>
            <p>• Arrive at least 15 minutes before the exam</p>
            <p>• Electronic devices are not allowed during the exam</p>
            <p>• The QR code will be scanned for verification</p>
          </div>
        </div>
      </div>

      <NavBar userRole="student" />
    </div>
  );
};

export default PermitPage;

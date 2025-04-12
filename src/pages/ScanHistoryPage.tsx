
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Clock } from "lucide-react";

// Mock scan history data
const mockScanHistory = [
  {
    id: "scan1",
    studentName: "John Doe",
    regNumber: "UNI/2023/001",
    status: "VALID",
    timestamp: "2023-12-10T09:30:00Z",
    examName: "Computer Science 101"
  },
  {
    id: "scan2",
    studentName: "Jane Smith",
    regNumber: "UNI/2023/002",
    status: "EXPIRED",
    timestamp: "2023-12-10T10:15:00Z",
    examName: "Mathematics 201"
  },
  {
    id: "scan3",
    studentName: "Bob Johnson",
    regNumber: "UNI/2023/003",
    status: "VALID",
    timestamp: "2023-12-10T11:05:00Z",
    examName: "Physics 301"
  },
  {
    id: "scan4",
    studentName: "Alice Brown",
    regNumber: "UNI/2023/004",
    status: "INVALID",
    timestamp: "2023-12-10T11:45:00Z",
    examName: "English Literature 202"
  }
];

const ScanHistoryPage = () => {
  const { user } = useAuth();
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Helper function to format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-2">Scan History</h1>
        <p className="text-muted-foreground mb-6">Recent permit verifications</p>
        
        <div className="space-y-4">
          {mockScanHistory.map((scan) => (
            <Card key={scan.id} className="p-4 neuro-card">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{scan.studentName}</div>
                <Badge 
                  className={`${
                    scan.status === "VALID"
                      ? "bg-green-500"
                      : scan.status === "EXPIRED"
                      ? "bg-amber-500"
                      : "bg-destructive"
                  }`}
                >
                  {scan.status}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground mb-2">{scan.regNumber}</div>
              <div className="text-sm mb-3">{scan.examName}</div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(scan.timestamp)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTime(scan.timestamp)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default ScanHistoryPage;


import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AlertCircle, CheckCircle, BadgeDollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";
import { toast } from "sonner";

const StudentDetailsPage = () => {
  const location = useLocation();
  const studentData = location.state?.studentData as StudentData;
  const [processingApproval, setProcessingApproval] = useState(false);
  const [processingPending, setProcessingPending] = useState(false);
  const [permitStatus, setPermitStatus] = useState<'valid' | 'pending' | 'approved'>(
    studentData?.feesBalance === 0 ? 'valid' : 'pending'
  );
  const [approvalDetails, setApprovalDetails] = useState<{
    invigilator: string;
    timestamp: string;
  } | null>(null);

  if (!studentData) {
    return <Navigate to="/scan" replace />;
  }

  const isPermitValid = studentData.feesBalance === 0;
  const isApproved = permitStatus === 'approved';
  const isPending = permitStatus === 'pending';

  const handleApprove = () => {
    if (!isPermitValid) {
      toast.error("Cannot approve. Student has outstanding balance.");
      return;
    }

    setProcessingApproval(true);
    
    // Simulate API call
    setTimeout(() => {
      setPermitStatus('approved');
      setApprovalDetails({
        invigilator: "Dr. Jane Smith",
        timestamp: new Date().toLocaleString(),
      });
      setProcessingApproval(false);
      toast.success("Permit approved successfully!");
      
      // Here you would make an actual API call to Supabase
      // supabase.from('permit_approvals').insert({...})
    }, 1500);
  };

  const handlePending = () => {
    setProcessingPending(true);
    
    // Simulate API call
    setTimeout(() => {
      setPermitStatus('pending');
      setApprovalDetails({
        invigilator: "Dr. Jane Smith",
        timestamp: new Date().toLocaleString(),
      });
      setProcessingPending(false);
      toast.warning("Permit marked as pending for review");
      
      // Here you would make an actual API call to Supabase
      // supabase.from('permit_status').update({...})
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-university-blue text-white p-6">
        <h1 className="text-2xl font-bold">Student Details</h1>
      </div>

      {approvalDetails && (
        <div className={`p-4 mb-2 ${isApproved ? 'bg-green-50' : 'bg-yellow-50'} border-l-4 ${isApproved ? 'border-green-500' : 'border-yellow-500'}`}>
          <div className="flex items-center">
            {isApproved ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            )}
            <div>
              <p className="font-medium">
                {isApproved ? 'Approved' : 'Marked as Pending'} by: {approvalDetails.invigilator}
              </p>
              <p className="text-sm text-muted-foreground">
                Time: {approvalDetails.timestamp}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <Card className="p-6 neuro-card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">{studentData.name}</h2>
              <p className="text-muted-foreground">{studentData.regNumber}</p>
            </div>
            <Badge variant={isPermitValid ? "default" : "destructive"}>
              {isPermitValid ? "VALID" : "INVALID"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Course</span>
              <span>{studentData.course}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Semester</span>
              <span>{studentData.semester}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Fees Balance</span>
              <span className="font-semibold">
                ${studentData.feesBalance.toFixed(2)}
              </span>
            </div>
          </div>

          {!isPermitValid && (
            <div className="mt-6 p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Outstanding Balance</span>
              </div>
              <p className="mt-2 text-sm">
                Student has an outstanding balance of ${studentData.feesBalance.toFixed(2)}.
                Permit cannot be validated until full payment is made.
              </p>
            </div>
          )}

          {isPermitValid && !isApproved && (
            <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Permit Valid</span>
              </div>
              <p className="mt-2 text-sm">
                All fees have been cleared. Student is eligible to take the exam.
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button 
              onClick={handleApprove} 
              className="flex-1 bg-university-green hover:bg-university-green/90"
              disabled={processingApproval || isApproved || !isPermitValid}
            >
              {processingApproval ? "Processing..." : isApproved ? "Approved" : "Approve"}
            </Button>
            <Button 
              onClick={handlePending} 
              className="flex-1" 
              variant="outline"
              disabled={processingPending}
            >
              {processingPending ? "Processing..." : "Pending"}
            </Button>
          </div>
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default StudentDetailsPage;

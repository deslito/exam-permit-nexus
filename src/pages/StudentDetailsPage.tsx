
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AlertCircle, CheckCircle, BadgeDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { StudentData } from "@/types/student";

const StudentDetailsPage = () => {
  const location = useLocation();
  const studentData = location.state?.studentData as StudentData;

  if (!studentData) {
    return <Navigate to="/scan" replace />;
  }

  const isPermitValid = studentData.feesBalance === 0;

  return (
    <div className="min-h-screen pb-16">
      <div className="bg-university-primary text-white p-6">
        <h1 className="text-2xl font-bold">Student Details</h1>
      </div>

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

          {isPermitValid && (
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
        </Card>
      </div>

      <NavBar />
    </div>
  );
};

export default StudentDetailsPage;

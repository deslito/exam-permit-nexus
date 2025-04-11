
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PermitCard from "@/components/PermitCard";
import { PermitData } from "@/components/PermitCard";

const HistoryPage = () => {
  const { user } = useAuth();

  // Mock permit history data
  const permitHistory: PermitData[] = [
    {
      id: "PERM-123456",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      semester: "Fall 2023",
      courseName: "Advanced Mathematics",
      examDate: "May 15, 2023",
      status: "valid",
    },
    {
      id: "PERM-123455",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      semester: "Fall 2023",
      courseName: "Computer Science",
      examDate: "May 18, 2023",
      status: "valid",
    },
    {
      id: "PERM-123454",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      semester: "Spring 2023",
      courseName: "Data Structures",
      examDate: "January 10, 2023",
      status: "expired",
    },
    {
      id: "PERM-123453",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      semester: "Spring 2023",
      courseName: "Software Engineering",
      examDate: "January 15, 2023",
      status: "expired",
    },
  ];

  // Group permits by semester
  const groupedPermits: Record<string, PermitData[]> = permitHistory.reduce(
    (acc, permit) => {
      if (!acc[permit.semester]) {
        acc[permit.semester] = [];
      }
      acc[permit.semester].push(permit);
      return acc;
    },
    {} as Record<string, PermitData[]>
  );

  // Sort semesters by most recent first
  const sortedSemesters = Object.keys(groupedPermits).sort().reverse();

  return (
    <div className="min-h-screen pb-16">
      <PageHeader title="Permit History" />

      <div className="p-4 space-y-6">
        {sortedSemesters.length > 0 ? (
          sortedSemesters.map((semester) => (
            <div key={semester} className="space-y-4">
              <h2 className="text-lg font-semibold">{semester}</h2>
              <div className="space-y-4">
                {groupedPermits[semester].map((permit) => (
                  <PermitCard
                    key={permit.id}
                    permitData={permit}
                    variant="simple"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No permit history found</p>
          </div>
        )}
      </div>

      <NavBar userRole="student" />
    </div>
  );
};

export default HistoryPage;

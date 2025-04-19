
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import NavBar from "@/components/NavBar";
import PageHeader from "@/components/PageHeader";
import PermitCard from "@/components/PermitCard";
import { PermitData } from "@/components/PermitCard";

// Update PermitData to use the correct semester format
type ExtendedPermitData = Omit<PermitData, 'semester'> & {
  displaySemester: string;
  semester: "I" | "II";
};

const HistoryPage = () => {
  const { user } = useAuth();

  // Mock permit history data
  const permitHistory: ExtendedPermitData[] = [
    {
      id: "PERM-123456",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      displaySemester: "Fall 2023",
      semester: "I",
      gender: "Male",
      yearOfStudy: 3,
      faculty: "Science",
      department: "Computer Science",
      courseName: "Advanced Mathematics",
      examDate: "May 15, 2023",
      status: "valid",
      courseUnits: ["CSC 301", "CSC 302"],
    },
    {
      id: "PERM-123455",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      displaySemester: "Fall 2023",
      semester: "I",
      gender: "Male",
      yearOfStudy: 3,
      faculty: "Science",
      department: "Computer Science",
      courseName: "Computer Science",
      examDate: "May 18, 2023",
      status: "valid",
      courseUnits: ["CSC 303", "CSC 304"],
    },
    {
      id: "PERM-123454",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      displaySemester: "Spring 2023",
      semester: "II",
      gender: "Male",
      yearOfStudy: 2,
      faculty: "Science",
      department: "Computer Science",
      courseName: "Data Structures",
      examDate: "January 10, 2023",
      status: "expired",
      courseUnits: ["CSC 201", "CSC 202"],
    },
    {
      id: "PERM-123453",
      studentName: user?.name || "John Doe",
      regNumber: user?.regNumber || "UNI/2023/001",
      displaySemester: "Spring 2023",
      semester: "II",
      gender: "Male",
      yearOfStudy: 2,
      faculty: "Science",
      department: "Computer Science",
      courseName: "Software Engineering",
      examDate: "January 15, 2023",
      status: "expired",
      courseUnits: ["CSC 205", "CSC 206"],
    },
  ];

  // Group permits by display semester
  const groupedPermits: Record<string, ExtendedPermitData[]> = permitHistory.reduce(
    (acc, permit) => {
      if (!acc[permit.displaySemester]) {
        acc[permit.displaySemester] = [];
      }
      acc[permit.displaySemester].push(permit);
      return acc;
    },
    {} as Record<string, ExtendedPermitData[]>
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

      <NavBar />
    </div>
  );
};

export default HistoryPage;

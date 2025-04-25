
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { CheckCircle, Clock, CreditCard, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  const { user } = useAuth();
  
  // Determine if user is an invigilator
  const isInvigilator = user?.role === "invigilator";

  // Mock data
  const permitStatus = "valid"; // valid | pending | expired
  const nextExamDate = "May 15, 2025";
  const paymentStatus = "Paid";
  const courseProgress = 75;
  
  // Default to Year 1 Semester I if user data is not available
  const yearOfStudy = user?.yearOfStudy || 1;
  const semester = user?.semester || 'I';
  const currentSemester = `Year ${yearOfStudy} Semester ${semester}`;
  
  // Mock data for invigilator dashboard
  const recentScans = [
    {
      id: "SC001",
      studentName: "Mubiru Timothy",
      regNumber: "21/U/ITD/3925/PD",
      course: "Introduction to Programming",
      examDate: "May 15, 2025",
      status: "APPROVED"
    },
    {
      id: "SC002",
      studentName: "Muyingo Cynthia",
      regNumber: "21/U/ARC/38005/PD",
      course: "Architecture Design",
      examDate: "May 14, 2025",
      status: "APPROVED"
    }
  ];
  
  const upcomingExams = [
    {
      id: "EX001",
      course: "Data Structures",
      department: "Computer Science",
      date: "May 18, 2025",
      time: "9:00 AM",
      venue: "Main Building B12"
    },
    {
      id: "EX002",
      course: "Machine Learning",
      department: "Information Technology",
      date: "May 20, 2025",
      time: "2:00 PM",
      venue: "ICT Complex 308"
    },
    {
      id: "EX003",
      course: "Software Engineering",
      department: "Computer Science",
      date: "May 22, 2025",
      time: "9:00 AM",
      venue: "Main Building A15"
    }
  ];

  return (
    <div className="pb-16">
      {!isInvigilator && (
        <DashboardStats
          username={user?.name || "Asiimire Tracy"}
          regNumber={user?.regNumber || "23/U/DCE/04387/PD"}
          semester={currentSemester}
          permitStatus={permitStatus}
          paymentStatus={paymentStatus}
          courseProgress={courseProgress}
          examDate={nextExamDate}
        />
      )}

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {isInvigilator ? (
          <>
            {/* Invigilator Dashboard Content */}
            <h1 className="text-2xl font-bold mb-4">Invigilator Dashboard</h1>
            <section>
              <h2 className="text-lg font-semibold mb-3">Recent Scans</h2>
              <div className="space-y-3">
                {recentScans.map((scan) => (
                  <Card key={scan.id} className="p-4 neuro-card">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{scan.studentName}</div>
                        <div className="text-sm text-muted-foreground">{scan.regNumber}</div>
                        <div className="text-sm">{scan.course} - {scan.examDate}</div>
                      </div>
                      <div className="flex items-center">
                        <Badge status={scan.status} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Upcoming Exams</h2>
                <Button variant="ghost" size="sm">
                  See all
                </Button>
              </div>
              <div className="space-y-3">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id} className="p-4 neuro-card">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{exam.course}</div>
                        <div className="text-sm text-muted-foreground">{exam.department}</div>
                        <div className="text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exam.date} at {exam.time}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Venue: {exam.venue}</div>
                      </div>
                      <Button size="sm" variant="outline">Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
            
            {/* Quick Actions for Invigilator */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/scan" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                    <CreditCard className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">Scan Permit</span>
                  </div>
                </Link>
                <Link to="/scan-history" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                    <Clock className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">Scan History</span>
                  </div>
                </Link>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Student Dashboard Content */}
            {/* Quick Actions */}
            <section>
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/permit" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                    <CreditCard className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">View Permit</span>
                  </div>
                </Link>
                <Link to="/history" className="block">
                  <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                    <Clock className="w-6 h-6 text-university-blue" />
                    <span className="mt-2 font-medium text-sm">Permit History</span>
                  </div>
                </Link>
              </div>
            </section>
            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
                <Button variant="ghost" size="sm">
                  See all
                </Button>
              </div>
              <div className="space-y-3">
                <ActivityItem
                  title="Permit Generated"
                  description="Advanced Mathematics"
                  date="Today"
                />
                <ActivityItem
                  title="Payment Confirmed"
                  description="Semester Fees"
                  date="Yesterday"
                />
              </div>
            </section>
          </>
        )}
      </div>

      <NavBar />
    </div>
  );
};

// Badge for scan status
const Badge = ({ status }: { status: string }) => {
  let classes = "px-2 py-1 rounded-full text-xs font-medium";
  
  switch (status.toLowerCase()) {
    case "approved":
    case "valid":
      classes += " bg-green-100 text-green-800";
      break;
    case "pending":
      classes += " bg-blue-100 text-blue-800";
      break;
    case "expired":
    case "denied":
    case "invalid":
      classes += " bg-red-100 text-red-800";
      break;
    default:
      classes += " bg-gray-100 text-gray-800";
  }
  
  return <span className={classes}>{status}</span>;
};

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
}

const ActivityItem = ({ title, description, date }: ActivityItemProps) => (
  <div className="flex items-center justify-between py-2 border-b border-border hover:bg-gray-50 px-2 rounded">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <span className="text-xs text-muted-foreground">{date}</span>
  </div>
);

export default DashboardPage;

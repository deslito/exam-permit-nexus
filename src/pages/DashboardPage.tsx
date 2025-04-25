
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import { Calendar, CheckCircle, Clock, CreditCard, History } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardStats from "@/components/DashboardStats";
import { Card } from "@/components/ui/card";

const DashboardPage = () => {
  const { user } = useAuth();
  const isInvigilator = user?.role === "invigilator";
  
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
      status: "EXPIRED"
    }
  ];
  
  const supervisedExams = [
    {
      id: "EX001",
      course: "Data Structures",
      date: "May 18, 2025",
      venue: "Main Building B12",
      students: 45
    },
    {
      id: "EX002",
      course: "Machine Learning",
      date: "May 20, 2025",
      venue: "ICT Complex 308",
      students: 32
    }
  ];

  return (
    <div className="pb-16">
      {!isInvigilator ? (
        <DashboardStats
          username={user?.name || "Student"}
          regNumber={user?.regNumber || ""}
          semester={user?.semester || ""}
          permitStatus="valid"
          paymentStatus="Paid"
          courseProgress={75}
          examDate="May 15, 2025"
        />
      ) : (
        <div className="bg-university-blue text-white p-6 pt-8">
          <h1 className="text-2xl font-bold">Welcome back,</h1>
          <p className="opacity-90 font-medium">{user?.name}</p>
          <div className="text-xs opacity-75 mt-1">
            Staff ID: {user?.regNumber} • Semester II
          </div>
          
          {/* Stats Bar */}
          <div className="px-4 -mt-6 relative top-12">
            <div className="glass-card neuro-card p-4 flex justify-between">
              <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
                <div className="text-xs text-muted-foreground">Today's Exams</div>
                <div className="flex items-center mt-1 font-medium">
                  <Calendar className="w-4 h-4 text-permit-valid mr-1" />
                  <span>2</span>
                </div>
              </div>
              <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
                <div className="text-xs text-muted-foreground">Students</div>
                <div className="flex items-center mt-1 font-medium">
                  <CheckCircle className="w-4 h-4 text-permit-valid mr-1" />
                  <span>45</span>
                </div>
              </div>
              <div className="flex flex-col items-center transition-transform hover:scale-105 cursor-pointer">
                <div className="text-xs text-muted-foreground">Progress</div>
                <div className="flex items-center mt-1 font-medium">
                  <div className="w-12 bg-muted h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-university-green"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="ml-1">75%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isInvigilator && (
        <div className="p-4 space-y-6 mt-8">
          {/* Upcoming Exam */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Upcoming Exam</h2>
              <Button variant="ghost" size="sm">View More</Button>
            </div>
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Advanced Mathematics</h3>
                  <p className="text-sm text-muted-foreground">May 15, 2025</p>
                </div>
                <Calendar className="text-muted-foreground" />
              </div>
            </Card>
          </section>

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
              <Link to="/scan-history" className="block">
                <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center hover:shadow-neuro-inset transition-all duration-200 hover:bg-gray-50">
                  <History className="w-6 h-6 text-university-blue" />
                  <span className="mt-2 font-medium text-sm">Scan History</span>
                </div>
              </Link>
            </div>
          </section>

          {/* Recent Scans */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Recent Scans</h2>
              <Button variant="ghost" size="sm">See all</Button>
            </div>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <Card key={scan.id} className="p-4 neuro-card">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{scan.studentName}</div>
                      <div className="text-sm text-muted-foreground">{scan.regNumber}</div>
                      <div className="text-sm">{scan.course}</div>
                    </div>
                    <div className="flex items-center">
                      <Badge status={scan.status} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm">See all</Button>
            </div>
            <div className="space-y-3">
              {supervisedExams.map((exam) => (
                <Card key={exam.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exam.course}</h3>
                      <p className="text-sm text-muted-foreground">{exam.venue}</p>
                      <div className="text-sm mt-1">
                        <span className="text-muted-foreground">Students: </span>
                        {exam.students}
                      </div>
                    </div>
                    <p className="text-sm text-right text-muted-foreground">{exam.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      )}

      <NavBar />
    </div>
  );
};

const Badge = ({ status }: { status: string }) => {
  let classes = "px-2 py-1 rounded-full text-xs font-medium";
  
  switch (status.toLowerCase()) {
    case "approved":
      classes += " bg-green-100 text-green-800";
      break;
    case "expired":
      classes += " bg-red-100 text-red-800";
      break;
    default:
      classes += " bg-gray-100 text-gray-800";
  }
  
  return <span className={classes}>{status}</span>;
};

export default DashboardPage;

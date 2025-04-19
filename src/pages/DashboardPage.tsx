
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import { Calendar, CheckCircle, Clock, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user } = useAuth();

  // Mock data
  const permitStatus = "valid"; // valid | pending | expired
  const nextExamDate = "May 15, 2023";
  const paymentStatus = "Paid";
  const courseProgress = 75;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="w-5 h-5 text-permit-valid" />;
      case "pending":
        return <Clock className="w-5 h-5 text-permit-pending" />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="bg-university-primary text-white p-6 pt-8 rounded-b-3xl">
        <h1 className="text-2xl font-bold">Welcome back,</h1>
        <p className="opacity-90 font-medium">{user?.name}</p>
        <div className="text-xs opacity-75 mt-1">
          Reg: {user?.regNumber} • Semester: {user?.semester}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 -mt-6">
        <div className="glass-card p-4 flex justify-between">
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Permit</div>
            <div className="flex items-center mt-1 font-medium">
              {getStatusIcon(permitStatus)}
              <span className="ml-1 capitalize">{permitStatus}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Payment</div>
            <div className="flex items-center mt-1 font-medium">
              <CheckCircle className="w-5 h-5 text-permit-valid" />
              <span className="ml-1">{paymentStatus}</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Progress</div>
            <div className="flex items-center mt-1 font-medium">
              <div className="w-12 bg-muted h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-university-secondary"
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
              <span className="ml-1">{courseProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Upcoming Exam */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Upcoming Exam</h2>
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-10 h-10 p-2 rounded-lg bg-muted text-university-primary" />
                <div className="ml-4">
                  <h3 className="font-medium">Advanced Mathematics</h3>
                  <p className="text-sm text-muted-foreground">{nextExamDate}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="neuro-button"
                onClick={() => toast.info("Calendar sync coming soon")}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/permit" className="block">
              <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center neuro-button">
                <CreditCard className="w-6 h-6 text-university-primary" />
                <span className="mt-2 font-medium text-sm">View Permit</span>
              </div>
            </Link>
            <Link to="/history" className="block">
              <div className="neuro-card p-4 text-center h-24 flex flex-col items-center justify-center neuro-button">
                <Clock className="w-6 h-6 text-university-primary" />
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
      </div>

      <NavBar />
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  date: string;
}

const ActivityItem = ({ title, description, date }: ActivityItemProps) => (
  <div className="flex items-center justify-between py-2 border-b border-border">
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <span className="text-xs text-muted-foreground">{date}</span>
  </div>
);

export default DashboardPage;

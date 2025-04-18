
import React from "react";
import { Calendar, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import QRCode from "./QRCode";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export interface PermitData {
  id: string;
  studentName: string;
  regNumber: string;
  gender: string;
  yearOfStudy: number;
  semester: "I" | "II";
  faculty: string;
  department: string;
  courseName: string;
  courseUnits: string[];
  examDate: string;
  status: "valid" | "pending" | "expired";
  photoUrl?: string;
}

interface PermitCardProps {
  permitData: PermitData;
  className?: string;
  variant?: "default" | "simple";
}

const PermitCard = ({ permitData, className, variant = "default" }: PermitCardProps) => {
  const {
    id,
    studentName,
    regNumber,
    gender,
    yearOfStudy,
    semester,
    faculty,
    department,
    courseName,
    courseUnits,
    examDate,
    status,
    photoUrl,
  } = permitData;

  return (
    <div
      className={cn(
        "w-full",
        variant === "default" ? "glass-card p-5" : "neuro-card p-4",
        className
      )}
    >
      {/* University Header */}
      <div className="text-center mb-6 border-b pb-4">
        <img
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742"
          alt="University Logo"
          className="h-16 mx-auto mb-2 object-contain"
        />
        <h2 className="text-lg font-semibold text-university-primary">East Valley University</h2>
        <p className="text-sm text-muted-foreground">Excellence in Education</p>
        <p className="text-sm text-muted-foreground mt-1">Academic Year 2025</p>
      </div>

      {/* Student Info with Photo */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar className="h-20 w-20 border-2 border-muted">
          <AvatarImage src={photoUrl || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} />
          <AvatarFallback><User className="h-8 w-8" /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-bold text-lg">{courseName}</h3>
          <p className="text-sm text-muted-foreground">Semester {semester} - Year {yearOfStudy}</p>
          <div className="mt-2">
            <p className="font-medium">{studentName}</p>
            <p className="text-xs text-muted-foreground">{regNumber}</p>
            <p className="text-xs text-muted-foreground">Gender: {gender}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>
      
      {/* Academic Details */}
      <div className="space-y-3 mt-4 border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Faculty</p>
            <p className="font-medium text-sm">{faculty}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Department</p>
            <p className="font-medium text-sm">{department}</p>
          </div>
        </div>
        
        {/* Course Units */}
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Enrolled Units</p>
          <div className="bg-muted/50 p-3 rounded-lg">
            <ul className="text-xs space-y-1">
              {courseUnits.map((unit, index) => (
                <li key={index}>{unit}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{examDate}</span>
        </div>

        {variant === "default" && (
          <div className="mt-4 flex justify-center py-2 border-t">
            <QRCode value={id} size={120} />
          </div>
        )}
      </div>

      {/* Additional University Details */}
      <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
        <p>East Valley University - Department of Examinations</p>
        <p>123 University Avenue, Academic District</p>
        <p>Phone: (555) 123-4567 | Email: exams@eastvalley.edu</p>
      </div>
    </div>
  );
};

export default PermitCard;

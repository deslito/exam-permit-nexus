
import React from "react";
import { Calendar, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import QRCode from "./QRCode";
import { cn } from "@/lib/utils";

export interface PermitData {
  id: string;
  studentName: string;
  regNumber: string;
  semester: string;
  courseName: string;
  examDate: string;
  status: "valid" | "pending" | "expired";
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
    semester,
    courseName,
    examDate,
    status,
  } = permitData;

  return (
    <div
      className={cn(
        "w-full",
        variant === "default" ? "glass-card p-5" : "neuro-card p-4",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{courseName}</h3>
          <p className="text-sm text-muted-foreground">Semester {semester}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <div className="flex flex-col">
            <span className="font-medium">{studentName}</span>
            <span className="text-xs text-muted-foreground">{regNumber}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">{examDate}</span>
        </div>

        {variant === "default" && (
          <div className="mt-4 flex justify-center py-2">
            <QRCode value={id} size={120} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitCard;

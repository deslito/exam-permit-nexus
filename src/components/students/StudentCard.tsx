
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    regNumber: string;
    email: string;
    permitStatus: string;
    photoUrl?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const StudentCard = ({ student, onEdit, onDelete }: StudentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "VALID": return "bg-green-500";
      case "PENDING": return "bg-amber-500";
      case "EXPIRED": return "bg-destructive";
      case "INVALID": return "bg-destructive";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card className="p-4 neuro-card">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12 border-2 border-muted">
            <AvatarImage src={student.photoUrl} alt={student.name} />
            <AvatarFallback>{student.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{student.name}</div>
            <div className="text-sm text-muted-foreground mb-1">{student.regNumber}</div>
            <div className="text-sm">{student.email}</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Badge className={getStatusColor(student.permitStatus)}>
            {student.permitStatus}
          </Badge>
          <div className="flex space-x-2 mt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(student.id)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onDelete(student.id)}
              className="text-destructive"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentCard;

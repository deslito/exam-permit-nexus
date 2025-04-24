
export interface StudentData {
  id: string;
  name: string;
  regNumber: string;
  course: string;
  semester: string;
  feesBalance: number;
  permitStatus: "VALID" | "INVALID" | "EXPIRED";
}

export interface CourseUnit {
  code: string;
  name: string;
  creditUnits: number;
  category: "CORE" | "ELECTIVE";
  status: "NORMAL" | "RETAKE";
}

export interface PermitData {
  id: string;
  studentName: string;
  studentNumber: string;
  regNumber: string;
  gender: string;
  programme: string;
  yearOfStudy: number;
  campus: string;
  semester: string;
  academicYear: string;
  faculty: string;
  department: string;
  courseName: string;
  courseUnits: CourseUnit[];
  examDate: string;
  status: "valid" | "pending" | "expired";
  photoUrl: string;
  printDate?: string;
}

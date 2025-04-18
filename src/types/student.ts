
export interface StudentData {
  id: string;
  name: string;
  regNumber: string;
  course: string;
  semester: string;
  feesBalance: number;
  permitStatus: "VALID" | "INVALID" | "EXPIRED";
}

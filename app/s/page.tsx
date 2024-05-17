import { StudentsTable } from "@/components/students/table";
import { Student, StudentWithUser } from "@/types/students";
import Link from "next/link";
import { getStudents } from "../actions/students";

export default async function StudentDashboard() {
  const students: Student[] = await getStudents();
  // const studentsWithUser: StudentWithUser[] = students?.map((student) => ({
  //   ...student,  
  //   ...student.user, 
  // }));
  return <div className="flex flex-col gap-4 py-4" >
    <Link href='/students/add' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg mr-2 " >
      + Add Student
    </Link>
    <StudentsTable rawStudents={students} />
  </div>
}

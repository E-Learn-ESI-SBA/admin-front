import { IQuiz } from "@/types/quiz";
import { DataTable } from "../common/table";
import { quiz } from "@/static/dummy-data/quiz/quiz";
import { CustomColumns } from "./collomns";
import { Student, StudentWithUser } from "@/types/students";
import students from "@/static/dummy-data/students"; 
import { getStudent } from "@/app/actions/students";
import { TeacherWithUser } from "@/types/teachers";

export async function StudentsTable() {
  'use server'
  const students: Student[] = await getStudent(); 
  console.log(students)
  const studentsWithUser: StudentWithUser[] = students.map((student) => ({
    ...student,  
    ...student.user, 
  }));

  return (
    <>
      <DataTable<StudentWithUser>
        data={studentsWithUser}
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "first_name",
            title: "First Name",
          },
          {
            accessorKey: "last_name",
            title: "Last Name",
          },
          {
            accessorKey: "promo",
            title: "Class",
          },
          {
            accessorKey: "group",
            title: "Group",
          },
          {
            accessorKey: "email",
            title: "Email adress",
          },
          {
            accessorKey: "gender",
            title: "Gender",
          },
          {
            accessorKey: "city",
            title: "City",
          },
          {
            accessorKey: "phone_number",
            title: "Phone",
          },
          {
            accessorKey: "registration_number",
            title: "Phone",
          },
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="first_name"
        fuzzyElements={["promo", "gender", "city"]}
      />
    </>
  );
}

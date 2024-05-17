'use client'
import { IQuiz } from "@/types/quiz";
import { DataTable } from "../common/table";
import { quiz } from "@/static/dummy-data/quiz/quiz";
import { CustomColumns } from "./collomns";
import { useState } from "react";
import { Student, StudentWithUser } from "@/types/students";
import students from "@/static/dummy-data/students";
import { deleteStudent, getStudents } from "@/app/actions/students";
import { TeacherWithUser } from "@/types/teachers";
import { toast } from "sonner"

export function StudentsTable({ rawStudents }: { rawStudents: Student[] }) {
    const students: StudentWithUser[] = rawStudents.map((student: Student) => {
      const {user, promo, group, registration_number} = student;
      return { ...user, promo, group, registration_number}
    })
  const [localStudents, setLocalStudents] = useState<StudentWithUser[]>(students);

  const deleteHandler = async (student: StudentWithUser) => {
    try {
      const response = await deleteStudent(student.id);
      setLocalStudents(prevStudents => prevStudents.filter(s => s.id != student.id))
    } catch (err: any) {
      console.log(err.message)
      throw new Error(err.message)

    }
  }

  // const studentsWithUser: Student[] = localStudents.map((student) => ({
  //   ...student,
  //   ...student.user,
  // }));

  return (
    <>
      <DataTable<StudentWithUser>
        data={localStudents}
        url="/s"
        deleteHandler={(student) => deleteHandler(student)}
        headers={[
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
            title: "Promo",
          },
          {
            accessorKey: "year",
            title: "Year",
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
            accessorKey: "registration_number",
            title: "Registration Number",
          },
        ]}
        // customColumns={[CustomColumns]}
        defaultFilter="first_name"
        fuzzyElements={["promo", "city", "promo", "group"]}
      // customOperations={[{
      //   title: "Add Quiz",
      //   handler
      // }]}
      />
    </>
  );
}

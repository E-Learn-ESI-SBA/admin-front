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

export function StudentsTable({ students }: { students: StudentWithUser[] }) {

  const [localStudents, setLocalStudents] = useState<StudentWithUser[]>(students);

  const deleteHandler = async (student: StudentWithUser) => {
    try {
      const response = await deleteStudent(student.id);
      toast.success("Student deleted successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      setLocalStudents(prevStudents => prevStudents.filter(s => s.id != student.id))
    } catch (err) {
      console.log(err)
      toast.error("Error when deleting student", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  }


  const studentsWithUser: StudentWithUser[] = localStudents.map((student) => ({
    ...student,
    ...student.user,
  }));

  return (
    <>
      <DataTable<StudentWithUser>
        data={studentsWithUser}
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

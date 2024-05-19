'use client'
import { DataTable } from "../common/table";
import { useState } from "react";
import { Teacher, TeacherWithUser } from "@/types/teachers";
import { toast } from "sonner"
import { deleteTeacher } from "@/app/actions/teachers";

export function TeachersTable({ rawTeachers }: { rawTeachers: Teacher[] }) {
  console.log(rawTeachers)
    const teachers: TeacherWithUser[] = rawTeachers?.map((teacher: Teacher) => {
      const {user, position, classes, courses } = teacher;
      return { 
        id: user?.id ?? '',
        email: user?.email ?? '',
        first_name: user?.first_name ?? '',
        last_name: user?.last_name ?? '',
        classes: classes ?? [],
        position: position ?? '',
        courses: courses ?? [],
        gender: user?.gender,
        phone_number: user?.phone_number,
        password: user?.password,
        city: user?.city,
      };
    })
  const [localTeachers, setLocalTeachers] = useState<TeacherWithUser[]>(teachers);

  const deleteHandler = async (teacher: TeacherWithUser) => {
    try {
      const response = await deleteTeacher(teacher.id);
      setLocalTeachers(prevTeachers => prevTeachers.filter(t => t.id != teacher.id))
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
      <DataTable<TeacherWithUser>
        data={localTeachers}
        url="/t"
        deleteHandler={(teacher) => deleteHandler(teacher)}
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
            accessorKey: "position",
            title: "Position",
          },
          {
            accessorKey: "phone_number",
            title: "Phone Number",
          },
        ]}
        // customColumns={[CustomColumns]}
        defaultFilter="first_name"
        fuzzyElements={["city", "position"]}
      // customOperations={[{
      //   title: "Add Quiz",
      //   handler
      // }]}
      />
    </>
  );
}

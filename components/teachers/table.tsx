import { DataTable } from "../common/table";
import { CustomColumns } from "./collomns";
import { Teacher, TeacherWithUser } from "@/types/teachers";
import { getTeachers } from "@/app/actions/teachers";


export async function TeachersTable() {
  const teachers:Teacher[] = await getTeachers(); 
  const teachersWithUser: TeacherWithUser[] = teachers.map((teacher) => ({
    ...teacher,  
    ...teacher.user, 
  }));
  
  return (
    <>
      <DataTable<TeacherWithUser>
        data={teachersWithUser}
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
        ]}
        customColumns={[CustomColumns]}
        defaultFilter="first_name"
        fuzzyElements={["gender"]}
      />
    </>
  );
}

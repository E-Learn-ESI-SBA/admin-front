import { DataTable } from "../common/table";
import { CustomColumns } from "./collomns";
import { Teacher, TeacherWithUser } from "@/types/teachers";
// import teachers from "@/static/dummy-data/teachers";
import { getStudents } from "@/app/teachers/actions";


export async function TeachersTable() {
  const teachers:Teacher[] = await getStudents(); 
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

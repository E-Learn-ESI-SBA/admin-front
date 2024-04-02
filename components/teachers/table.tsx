import { IQuiz } from "@/types/quiz";
import { DataTable } from "../common/table";
import { quiz } from "@/static/dummy-data/quiz/quiz";
import { CustomColumns } from "./collomns";
import { Teacher } from "@/types/teachers";
import teachers from "@/static/dummy-data/teachers";
export function TeachersTable() {
  return (
    <>
      <DataTable<Teacher>
        data={teachers}
        headers={[
          {
            accessorKey: "id",
            title: "ID",
          },
          {
            accessorKey: "name",
            title: "Name",
          },
          {
            accessorKey: "course",
            title: "Course",
          },
          {
            accessorKey: "class",
            title: "Class",
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
            accessorKey: "points",
            title: "Points",
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
        defaultFilter="name"
        fuzzyElements={["class", "gender", "course"]}
      />
    </>
  );
}

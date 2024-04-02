import { IQuiz } from "@/types/quiz";
import { DataTable } from "../common/table";
import { quiz } from "@/static/dummy-data/quiz/quiz";
import { CustomColumns } from "./collomns";
import { Student } from "@/types/students";
import students from "@/static/dummy-data/students";
export function QuizTable() {
  return (
    <>
      <DataTable<Student>
        data={students}
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
        fuzzyElements={["class", "gender", "city"]}
      />
    </>
  );
}

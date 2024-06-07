import { StudentsTable } from "@/components/students/table";
import { Student } from "@/types/students";
import Link from "next/link";
import { getStudents } from "@/app/actions/students";
import AlertError from "@/components/common/error";

export default async function StudentDashboard() {
  let students: Student[] = [];
  let errorMessage: any | null = null;

  try {
    students = await getStudents();
  } catch (err) {
    console.error("Failed to fetch students data:", err);
    errorMessage = err;
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href='/dashboard/students/add' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg mr-2">
        + Add Student
      </Link>
      {errorMessage ? (
        <AlertError error={errorMessage} />
      ) : (
        <StudentsTable rawStudents={students} />
      )}
    </div>
  );
}

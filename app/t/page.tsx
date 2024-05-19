import { TeachersTable } from "@/components/teachers/table";
import { Teacher } from "@/types/teachers";
import Link from "next/link";
import { getTeachers } from "../actions/teachers";

export default async function StudentDashboard() {
  let teachers: Teacher[] = [];
  let errorMessage: string | null = null;

  try {
    teachers = await getTeachers();
  } catch (err) {
    console.error("Failed to fetch teachers data:", err);
    errorMessage = "Failed to load teachers data. Please try again later.";
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href='/t/add' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg mr-2">
        + Add Teacher
      </Link>
      {errorMessage ? (
        <div className="text-red-500">
          {errorMessage}
        </div>
      ) : (
        <TeachersTable rawTeachers={teachers} />
      )}
    </div>
  );
}

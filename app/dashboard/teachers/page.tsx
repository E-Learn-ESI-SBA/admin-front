import { TeachersTable } from "@/components/teachers/table";
import { Teacher } from "@/types/teachers";
import Link from "next/link";
import { getTeachers } from "@/app/actions/teachers";
import AlertError from "@/components/common/error";

export default async function TeacherDashboard() {
  let teachers: Teacher[] = [];
  let errorMessage: any | null = null;

  try {
    teachers = await getTeachers();
  } catch (err) {
    console.error("Failed to fetch teachers data:", err);
    errorMessage = err;
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href='/dashboard/teachers/add' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg mr-2">
        + Add Teacher
      </Link>
      {errorMessage ? (
        <AlertError error={errorMessage} />
      ) : (
        <TeachersTable rawTeachers={teachers} />
      )}
    </div>
  );
}

import { TeachersTable } from "@/components/teachers/table";
import Link from "next/link";

export default function StudentDashboard() {
  return <div className="flex flex-col gap-4 py-4" >
  <Link href='/teachers/add' className="px-4 py-2 text-white bg-[#2C62EE] self-end rounded-lg mr-2 " >
    + Add Teacher
  </Link>
  <TeachersTable />
  </div> 
}
 
import { getStudentById } from '@/app/actions/students';
import { getGroups, getPromos, getYears } from '@/app/actions/utils';
import { AddOrUpdateStudent } from '@/components/students/addOrUpdateStudent'
import { User } from '@/types';
import { StudentWithUser } from '@/types/students';

export default async function Page ({ params }: { params: { id: string } }) {
  let student: StudentWithUser | null = null;
  let errorMessage: string | null = null;
  let promos: string[] = [];
  let groups: string[] = [];
  let years: string[] = [];

  try {
    groups = await getGroups();
    promos = await getPromos();
    years = await getYears();
    const data = await getStudentById(params.id);
    const { group, promo, registration_number, year, user } = data;
    student = { group, promo, registration_number, year, ...(user as User) };
    student['password'] = "redactedPassword";
  } catch (err) {
    console.error("Failed to fetch student data:", err);
    errorMessage = "Failed to load student data. Please try again later.";
  }

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
        <AddOrUpdateStudent addOrUpdate='UPDATE' initDefaultValues={student} groups={groups} promos={promos} years={years}/>
    </div>
  );
}

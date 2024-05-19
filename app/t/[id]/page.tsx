import { getTeacherById } from '@/app/actions/teachers';
import { AddOrUpdateTeacher } from '@/components/teachers/AddOrUpdateTeacher';
import { User } from '@/types';
import { TeacherWithUser } from '@/types/teachers';

export default async function Page ({ params }: { params: { id: string } }) {
  let teacher: TeacherWithUser | null = null;
  let errorMessage: string | null = null;

  try {
    const data = await getTeacherById(params.id);
    console.log(data)
    const { user } = data;
    console.log("data", data)
    console.log(data);
    teacher = { ...(user as User) };
    teacher['password'] = "redactedPassword";
  } catch (err) {
    console.error("Failed to fetch teacher data:", err);
    errorMessage = "Failed to load teacher data. Please try again later.";
  }

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
        <AddOrUpdateTeacher addOrUpdate='UPDATE' initDefaultValues={teacher}/>
    </div>
  );
}

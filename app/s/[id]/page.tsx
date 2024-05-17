import { getStudentById } from '@/app/actions/students';
import { AddOrUpdateStudent } from '@/components/students/addOrUpdateStudent'
import { User } from '@/types';
import { StudentWithUser } from '@/types/students';
// import React from 'react'


export default async function Page ({ params }: { params: { id: string } }) {
  const data = await getStudentById(params.id)
  const { group, promo, registration_number, year, user } = data;
  const student: StudentWithUser = { group, promo, registration_number, year, ...(user as User) };
  student['password'] = "redactedPassword"
  return (
    <div>
        <AddOrUpdateStudent addOrUpdate='UPDATE' initDefaultValues={student} />
    </div>
  )
}


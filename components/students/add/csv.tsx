//@ts-nocheck
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Gender } from '@/types/students';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addStudents } from '@/app/actions/students';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const generatePassword = (length = 12) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const studentSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters long" }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters long" }),
  promo: z.string().optional(),
  group: z.string().optional(),
  year: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  email: z.string().min(12, { message: "Email must be at least 12 characters long" }),
  phone_number: z.string().optional(),
});

const studentsSchema = z.array(studentSchema);

export const Csv = () => {
  const [csvData, setCsvData] = useState([]);
  const { handleSubmit } = useForm();
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split('\n').filter(line => line.trim() !== ''); 
      const data = lines.slice(1).map((line) => {
        const [first_name, last_name, promo, group, year, gender, email, phone_number] = line.split(',');
        return {
          first_name,
          last_name,
          promo,
          group,
          year,
          gender,
          email,
          phone_number,
        };
      });
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  const onSubmit = async() => {
    try {
      studentsSchema.parse(csvData);
       const students = csvData.map(({ first_name, last_name, promo, group, year, gender, email, phone_number }) => {
        const user = { first_name, last_name, email, phone_number, gender, password: generatePassword() };
        return { group, promo, registration_number: 'default_registration_number', year, user };
      });
      console.log(students)
      console.log('Validation succeeded!');
      const response = await addStudents(students)
      toast.success("All Students added successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      setTimeout(() => {
        router.push(`/dashboard/students/`)
      }, 3000)
    } catch (error) {
      toast.error("Error when adding students", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      console.log(error)
    }
  };

  return (
    <form className='flex flex-col gap-8 p-4' onSubmit={handleSubmit(onSubmit)}>
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <p className='text-gray-500'>Only support csv files</p>
      <ul>
        {csvData.map((item, index) => (
          <li key={index}>
            First Name: {item.first_name}, Last Name: {item.last_name}, Promo: {item.promo}, Group: {item.group}, Year: {item.year}, Gender: {item.gender}, Email: {item.email}, Phone Number: {item.phone_number}
          </li>
        ))}
      </ul>
      <Button type='submit' className='self-end'>+ add Students</Button>
    </form>
  );
};


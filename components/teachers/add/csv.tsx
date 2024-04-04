//@ts-nocheck
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Class, Gender,City } from '@/types/students';
import { Course } from '@/types/teachers';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const schema = z.array(
  z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    class: z.nativeEnum(Class),
    gender: z.nativeEnum(Gender),
    city: z.nativeEnum(City),
    course: z.nativeEnum(Course),
    email: z.string().min(12, { message: "Email must be at least 12 characters long" }),
    phone_number: z.string().min(10, { message: "Phone number must be at least 10 characters long" }),
  })

);

export const Csv = () => {
  const [csvData, setCsvData] = useState([]);
  const { handleSubmit } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split('\n');
      const data = lines.slice(1).map((line, index) => {
        const [name, classYear,course,email, gender,city, phoneNumber] = line.split(',');
        return {
          name,
          class: classYear,
          course,
          email,
          gender,
          city,
          phone_number: phoneNumber,
        };
      });
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  const onSubmit = () => {
    try {
        console.log('dd',csvData)
      schema.parse(csvData);
      console.log('Validation succeeded!');
    } catch (error) {
      console.error('Validation failed:', error.errors);
    }
  };

  return (
      <form className='flex flex-col gap-8 p-4'  onSubmit={handleSubmit(onSubmit)}>
        <Input type="file" accept={".csv"}  onChange={handleFileChange} />
        <p className='text-gray-500' >Only support csv files</p>
        <ul>
        {csvData.map((item, index) => (
          <li key={index}>
            Name: {item.name}, Class: {item.class},course: {item.course}, Gender: {item.gender}, Email: {item.email},city: {item.city} ,Phone Number: {item.phone_number}
          </li>
        ))}
      </ul>
        <Button type='submit' className='self-end' >+ add Teachers</Button>
      </form>
  );
};



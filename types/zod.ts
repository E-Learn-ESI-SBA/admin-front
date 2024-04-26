import { z } from "zod";
import {Class,Gender,City } from "./students";


/* 
Start Zod Schema for Student form

*/

const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/; 

export const studentSchemaValidator = z.object({
  id: z.string().optional(),
  first_name: z.string().min(2, { message: "must be at least 10 characters long" }),
  last_name: z.string().min(2, { message: "must be at least 10 characters long" }),
  promo: z.nativeEnum(Class),
  group: z.string(),
  gender: z.nativeEnum(Gender),
  email: z.string().min(12, { message: "must be at least 12 characters long" }),
  phone_number: z.coerce
    .number()
    .min(10, { message: "must be at least 10 numbers" }),
//   password: z.string().regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
  password: z.string().min(2, { message: "must be at least 10 characters long" }),
});

export type TStudentSchema = z.infer<typeof studentSchemaValidator>;


/* 
End Zod Schema for Student form  

*/
/* 
Start Zod Schema for Teacher form

*/


export const teacherSchemaValidator = z.object({
  id: z.string().optional(),
  first_name: z.string().min(3, { message: "must be at least 3 characters long" }),
  last_name: z.string().min(3, { message: "must be at least 3 characters long" }),
  classes: z.array(z.object({
    id: z.string(),
    value: z.string(),
  })),
  gender: z.nativeEnum(Gender).optional(),
  courses: z.array(z.object({
    id: z.string(),
    value: z.string(),
  })),
  email: z.string().min(12, { message: "must be at least 12 characters long" }),
  phone_number: z.string().optional(),
//   password: z.string().regex(timeRegex, { message: "invalid time format. Use HH:MM format." }),
  password: z.string().min(2, { message: "must be at least 10 characters long" }),
});

export type TTeacherSchema = z.infer<typeof teacherSchemaValidator>;


/* 
End Zod Schema for Teacher form  

*/

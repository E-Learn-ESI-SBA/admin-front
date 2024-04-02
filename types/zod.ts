import { z } from "zod";
import {Student,Class,Gender } from "./students";

/* 
Start Zod Schema for Student form

*/

const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/; 

export const studentSchemaValidator = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "must be at least 10 characters long" }),
  class: z.nativeEnum(Class),
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

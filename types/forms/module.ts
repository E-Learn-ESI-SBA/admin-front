import {z} from "zod";

export const FirstZodSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, { message: "must be at least 2 characters long" }),
    speciality: z.string().optional().default(""),
    semester: z.coerce.number().int().positive().min(1).max(2,"Please Write a valid value"),
    coefficient: z.coerce.number().int().positive().min(1,"Please Write a valid value").max(10,"Please Write a valid value"),
    year:z.string().min(3,"Please Write a valid value").max(10,"Please Write a valid value")

})


export type TFirstZodSchema = z.infer<typeof FirstZodSchema>;

export const  SecondSchema = z.object({
        description:z.string().min(80,""),
    points: z.array(
        z.object({
            value: z.string().min(3, { message: "Point Can't be empty" }),
        }),
    ).min(3,"must be at least 3 points"),
    instructors: z.array( z.object({ value : z.string().min(1,"Please add at least one instructor"), label: z.string()})),
})
export type TSecondSchema = z.infer<typeof SecondSchema>;
export enum FormState {
    OVERVIEW = 'overview',
    CONFIRM = 'confirm',
}

export const ThirdSchema = z.object({
    instructors:  z.array(
        z.object({
            value: z.string(),
        })).min(1,"Please add at least one instructor"),
})

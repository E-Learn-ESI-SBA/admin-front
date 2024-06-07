'use client'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Teacher, Gender, TeacherWithUser } from "@/types/teachers";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { addTeacher, updateTeacher } from "@/app/actions/teachers";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {  z } from "zod";
import { User } from "@/types";
import { useState } from "react";

type Props = {
    initDefaultValues?: TeacherWithUser
    addOrUpdate: "ADD" | "UPDATE"
}

const compareAndUpdateData = (updatedData: TeacherWithUser, initialData: TeacherWithUser): Partial<Teacher> => {
    const modifiedData: Partial<TeacherWithUser> = {};

    for (const key in updatedData) {
        if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
            if (updatedData[key as keyof TeacherWithUser] !== initialData[key as keyof TeacherWithUser]) {
                // @ts-ignore
                modifiedData[key as keyof TeacherWithUser] = updatedData[key as keyof TeacherWithUser];
            }
        }
    }

    if (Object.keys(modifiedData).length === 0) {
        return {};
    }
    const { ...userChanges } = modifiedData;
    const modifiedUser: Partial<User> = {};
    for (const key in userChanges) {
        if (Object.prototype.hasOwnProperty.call(userChanges, key)) {
            if ((updatedData as User)[key as keyof User] !== (initialData as User)[key as keyof User]) {
                modifiedUser[key as keyof User] = (updatedData as User)[key as keyof User];
            }
        }
    }
    const teacher: Partial<Teacher> = {
        user: Object.keys(modifiedUser).length ? modifiedUser : undefined
    };
    return teacher;
};






export function AddOrUpdateTeacher({ initDefaultValues, addOrUpdate }: Props) {
    const [initValues, setInitValues] = useState<TeacherWithUser | undefined>(initDefaultValues)

    const router = useRouter();
    const defaultValues = initDefaultValues ? initDefaultValues : {
        id: "",
        first_name: "",
        last_name: "",
        city: undefined,
        gender: undefined,
        email: "",
        phone_number: undefined,
        password: addOrUpdate == "UPDATE" ? "Redacted Password" : "",
    }
    const teacherSchemaValidator = z.object({
        id: z.string().optional(),
        first_name: z.string().min(3, { message: "must be at least 3 characters long" }),
        last_name: z.string().min(3, { message: "must be at least 3 characters long" }),
        gender: z.nativeEnum(Gender),
        email: z.string().min(12, { message: "must be at least 12 characters long" }),
        phone_number: z.string(),
        password: addOrUpdate == "UPDATE"
            ? z.string().min(10, { message: "password must be at least 10 characters long" }).optional().nullable()
            : z.string().min(10, { message: "password must be at least 10 characters long" }),
    });


    const form = useForm<TeacherWithUser>({
        resolver: zodResolver(teacherSchemaValidator),
        defaultValues,
        mode: "onChange",
    });

    const updateHandler = async (data: TeacherWithUser) => {
        // @ts-ignore
        const teacher = compareAndUpdateData(data, initValues);
        setInitValues(data)
        console.log(teacher)
        if (Object.keys(teacher).length == 0) {
            toast.success("Nothing changed");
            return
        }
        try {
            await updateTeacher(data.id, teacher);
            toast.success("Teacher updated successfully", {
                style: {
                    backgroundColor: "green",
                    color: "white",
                },
            });

            // setTimeout(() => {
            //   router.push('/s');
            // }, 2000);
        } catch (error) {
            toast.error("Error when updating Teacher", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                },
            });
        }
    };

    const addHandler = async (data: TeacherWithUser) => {
        const { ...user } = data;
        const teacher: Teacher = { user };
        try {
            const response = await addTeacher(teacher)
            console.log(response)
            toast.success("Teacher added successfully", {
                style: {
                    backgroundColor: "green",
                    color: "white",
                },
            });
            setTimeout(() => {
                router.push(`/dashboard/teachers/${response.user.id}`)
            }, 2000)
        } catch {
            toast.error("Error when adding Teacher", {
                style: {
                    backgroundColor: "red",
                    color: "white",
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    if (addOrUpdate == "ADD") {
                        addHandler(data)
                    } else {
                        updateHandler(data)
                    }
                })}
                className="space-y-8 flex flex-col gap-4  w-full p-4"
            >
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter first name here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter last name here..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-4" >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter Email..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Phone Number </FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="Enter Phone..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Password </FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter Password..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Gender:</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={Gender.MALE}>Male</SelectItem>
                                        <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <Button type="submit" className="p-5 w-fit self-end">
                    {addOrUpdate == "ADD" ? "Add Teacher" : "Update Teacher"}
                </Button>

            </form>
        </Form>
    );
}

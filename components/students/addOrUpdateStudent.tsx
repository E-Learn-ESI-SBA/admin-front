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
import { Student, Class, Gender, StudentWithUser } from "@/types/students";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addStudent, updateStudent } from "@/app/actions/students";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { User } from "@/types";

type Props = {
  initDefaultValues?: StudentWithUser
  addOrUpdate: "ADD" | "UPDATE"
  groups?: string[]
  promos?: string[]
  years?: string[]
}



const compareAndUpdateData = (updatedData: StudentWithUser, initialData: StudentWithUser): Partial<Student> => {
  const modifiedData: Partial<StudentWithUser> = {};

  for (const key in updatedData) {
    if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
      if (updatedData[key as keyof StudentWithUser] !== initialData[key as keyof StudentWithUser]) {
        modifiedData[key as keyof StudentWithUser] = updatedData[key as keyof StudentWithUser];
      }
    }
  }

  if (Object.keys(modifiedData).length === 0 && modifiedData.constructor === Object) {
    return {};
  }
  console.log(modifiedData)
  const { group, promo, registration_number, year, password, ...user } = modifiedData;
  const student: Partial<Student> = {
    group,
    promo,
    registration_number,
    year,
    user: {
      ...(user as Partial<User>)
    }
  };

  if (student && student.user && Object.keys(student.user).length === 0 && student.constructor === Object) {
    return {};
  }

  return student;
};



export function AddOrUpdateStudent({ initDefaultValues, addOrUpdate, groups, years, promos }: Props) {
  const router = useRouter()
  const defaultValues = initDefaultValues ? initDefaultValues : {
    id: "",
    first_name: "",
    last_name: "",
    year: undefined,
    promo: undefined,
    city: undefined,
    gender: undefined,
    email: "",
    phone_number: undefined,
    password: undefined,
  }

  const studentSchemaValidator = z.object({
    id: z.string(),
    first_name: z.string().min(2, { message: "must be at least 10 characters long" }),
    last_name: z.string().min(2, { message: "must be at least 10 characters long" }),
    promo: z.string().optional(),
    group: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    email: z.string().min(12, { message: "must be at least 12 characters long" }),
    phone_number: z.string().optional(),
    password: addOrUpdate == "UPDATE"
      ? z.string().min(10, { message: "password must be at least 10 characters long" }).optional().nullable()
      : z.string().min(10, { message: "password must be at least 10 characters long" })
  });

  type TStudentSchema = z.infer<typeof studentSchemaValidator>;

  const form = useForm<StudentWithUser>({
    resolver: zodResolver(studentSchemaValidator),
    defaultValues,
    mode: "onChange",
  });

  const updateHandler = async (data: StudentWithUser) => {
    const student = compareAndUpdateData(data, defaultValues);
    if (Object.keys(student).length == 0) {
      toast.success("Nothing changed");
      return
    }
    try {
      await updateStudent(data.id, student);
      toast.success("Student updated successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      // setTimeout(() => {
      //   router.push('/s');
      // }, 3000);
    } catch (error) {
      toast.error("Error when updating Student", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };



  const addHandler = async (data: StudentWithUser) => {
    const { group, promo, registration_number, year, ...user } = data;
    const student: Student = { group, promo, registration_number, year, user };
    try {
      const response = await addStudent(student)
      toast.success("Student added successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      setTimeout(() => {
        router.push(`/s/${response.user.id}`)
      }, 3000)
    } catch {
      toast.error("Error when adding student", {
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
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Class Year:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={defaultValues.year}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years?.map((year) => (
                      <SelectItem value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="promo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Promo:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={defaultValues.promo}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Promo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {promos?.map((promo) => (
                      <SelectItem value={promo}>{promo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Group:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Groupe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups?.map((group) => (
                      <SelectItem value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  defaultValue={defaultValues.gender}>
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



        <Button type="submit">
          {addOrUpdate == "ADD" ? "Add Student" : "Update Student"}
        </Button>

      </form>
    </Form>
  );
}

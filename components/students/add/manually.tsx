import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { studentSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Student, Class, Gender, StudentWithUser, StudentWithoutId } from "@/types/students";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addStudent } from "@/app/actions/students";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const defaultValues = {
  id: "",
  name: "",
  class: undefined,
  gender: undefined,
  email: undefined,
  phone_number: undefined,
  password: undefined,
}
export function Manually() {
  const router = useRouter()


  const form = useForm<StudentWithUser>({
    resolver: zodResolver(studentSchemaValidator),
    defaultValues,
    mode: "onChange",
  });

  const submitHandler = async (data: StudentWithUser) => {
    const { group, promo, registration_number, ...user } = data;
    const student: StudentWithoutId = { group, promo, registration_number, user };
    try{
      await addStudent(student)
      toast.success("Student added successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      setTimeout(() => {
        router.push('/s')
      }, 3000)
    }catch{
      toast.error("Student deleted successfully", {
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
    }
    const response = addStudent(student)
    console.log(response)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
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
            name="promo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Class:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Class.first_year}>1CP</SelectItem>
                    <SelectItem value={Class.second_year}>2CP</SelectItem>
                    <SelectItem value={Class.third_year}>1CS</SelectItem>
                    <SelectItem value={Class.fourth_year}>2CS</SelectItem>
                    <SelectItem value={Class.fifth_year}>3CS</SelectItem>
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
                    <SelectItem value={Class.first_year}>1</SelectItem>
                    <SelectItem value={Class.second_year}>2</SelectItem>
                    <SelectItem value={Class.third_year}>1</SelectItem>
                    <SelectItem value={Class.fourth_year}>2</SelectItem>
                    <SelectItem value={Class.fifth_year}>3</SelectItem>
                    <SelectItem value={Class.fifth_year}>4</SelectItem>
                    <SelectItem value={Class.fifth_year}>5</SelectItem>
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



        <Button type="submit">
          Add Student
        </Button>

      </form>
    </Form>
  );
}

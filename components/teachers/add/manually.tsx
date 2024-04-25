import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { teacherSchemaValidator } from "@/types/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Teacher, Class, Gender, Course, TeacherWithUser } from "@/types/teachers";
import { modulesData } from "@/static/dummy-data";
import { classesData } from "@/static/dummy-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MultipleSelector from "@/components/ui/multi-select";

const defaultValues = {
  id: "",
  first_name: "",
  last_name: "",
  classes: undefined,
  courses: undefined,
  description: undefined,
  gender: undefined,
  email: undefined,
  phone_number: undefined,
  password: undefined,
}
export function Manually() {



  const form = useForm<TeacherWithUser>({
    resolver: zodResolver(teacherSchemaValidator),
    defaultValues,
    mode: "onChange",
  });

  const submitHandler = (data: Teacher) => {

    console.log('data', data)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="space-y-8 flex flex-col gap-4  w-full p-4"
      >
        <div className="flex gap-4" >
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter teacher first name here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter teacher last name here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4" >
          <FormField
            control={form.control}
            name="courses"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Courses:</FormLabel>
                <MultipleSelector
                  aria-label="Select courses"
                  className="z-10"
                  value={modulesData}
                  onChange={field.onChange}
                  placeholder="Select courses"
                  options={modulesData}
                  defaultOptions={modulesData}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classes"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Classes:</FormLabel>
                <MultipleSelector
                  aria-label="Select classes"
                  className="z-10"
                  value={classesData}
                  onChange={field.onChange}
                  placeholder="Select classes"
                  options={classesData}
                  defaultOptions={classesData}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
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


        <Button type="submit">
          Add Teacher
        </Button>

      </form>
    </Form>
  );
}

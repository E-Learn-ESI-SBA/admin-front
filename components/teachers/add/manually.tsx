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
  import {  Teacher,Class,Gender,Course } from "@/types/teachers";
  import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
  } from '@/components/ui/select';
  
  const   defaultValues = {
    id: "",
    name: "",
    class: undefined,
    course: undefined,
    description: undefined,
    gender: undefined,
    email: undefined,
    phone_number: undefined,
    password: undefined,
  }
  export  function Manually() {
  

  
    const form = useForm<Teacher>({
      resolver: zodResolver(teacherSchemaValidator),
      defaultValues,
      mode: "onChange",
    });
  
    const submitHandler = (data: Teacher) => {
 console.log('data',data)
    };
  
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 flex flex-col gap-4  w-full p-4"
        >
  
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Teacher name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    <div className="flex gap-4" >
    <FormField
                              control={form.control}
                              name="class"
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
                              name="course"
                              render={({ field }) => (
                                  <FormItem className="w-full">
                                      <FormLabel>Course:</FormLabel>
                                      <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}>
                                          <FormControl>
                                              <SelectTrigger>
                                                  <SelectValue placeholder="Select Course" />
                                              </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                              <SelectItem value={Course.ARCHITECTURE_EVOLUEE}>ARCHI</SelectItem>
                                              <SelectItem value={Course.Analyse}>ANALYSE</SelectItem>
                                              <SelectItem value={Course.Reaseau}>RESEAU</SelectItem>
                                          </SelectContent>
                                      </Select>
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
                    <Input type="email" placeholder="Enter Email..." {...field}  />
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
  
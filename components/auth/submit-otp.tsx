import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { z } from "zod";
import useResetPassword from "@/lib/hooks/auth/reset";
import { AuthOption } from "./auth";

export const submitOTPSchema = z.object({
  email: z.string().email().min(2, "Email is required"),
  password: z.string().min(4, "Invalid password"),
  code: z.string().min(8, "Invalid OTP code").max(8, "Invalid OTP code"),
});

export type TSubmitOTPSchema = z.infer<typeof submitOTPSchema>;

export function SubmitOTP({
  setSelectedAuth,
}: {
  setSelectedAuth: (value: AuthOption) => void;
}) {
  const form = useForm<TSubmitOTPSchema>({
    mode: "onChange",
    resolver: zodResolver(submitOTPSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const { submitOTP } = useResetPassword();
  async function submitHandler(values: TSubmitOTPSchema) {
    const { success } = await submitOTP(
      values.email,
      values.code,
      values.password,
    );
    if (success) {
      setSelectedAuth("PASSWORD_RESET_SUCCESSFULLY");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-6 max-w-[380px]"
      >
        <CardHeader className=" my-8">
          <CardTitle className="text-4xl my-6 text-left font-bold">
            Reset your password
          </CardTitle>
          <CardDescription className="text-center text-gray-500 text-sm">
            check your email to get your one time password
          </CardDescription>
        </CardHeader>
        {}
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-2">
                <FormLabel>Email</FormLabel>
                <FormControl
                  className=" border-gray-500 border-2 px-3 rounded-md py-2"
                  placeholder="joe@example.com"
                >
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage className=" text-red-800 text-right font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-2">
                <FormLabel>New Password</FormLabel>
                <FormControl
                  className="border-gray-500 border-2 px-3 rounded-md py-2"
                  placeholder="YTg1NjVmMzQ="
                >
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage className=" text-red-800 text-right font-light" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-2">
                <FormLabel>OTP</FormLabel>
                <FormControl
                  className="border-gray-500 border-2 px-3 rounded-md py-2"
                  placeholder="6Tg1NjV4"
                >
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage className=" text-red-800 text-right font-light" />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex  justify-center">
          <Button
            className="w-full bg-blue-600 text-white"
            // disabled={loading}
            type="submit"
          >
            {/* { "..." } */}
            {/* {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
            Change password
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

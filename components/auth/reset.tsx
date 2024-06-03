"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthOption } from "./auth";
import useResetPassword from "@/lib/hooks/auth/reset";

export const resetSchema = z.object({
  email: z.string().email().min(2, "Email is required"),
});

export type TResetSchema = z.infer<typeof resetSchema>;

type TLoading = "LOADING" | "SUCCESS" | "ERROR" | "DEFAULT" | "DISABLED";
export function ResetPassword({
  setSelectedAuth,
}: {
  setSelectedAuth: (value: AuthOption) => void;
}) {
  const [isLoading, setIsLoading] = useState<TLoading>("DEFAULT");

  const { resetPassword } = useResetPassword();
  async function onSubmit(values: TResetSchema) {
    setIsLoading("LOADING");
    await resetPassword(values.email, setSelectedAuth);
    setTimeout(() => {
      setIsLoading("DEFAULT");
    }, 3000);
  }

  const form = useForm<TResetSchema>({
    mode: "onChange",
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-[380px]"
      >
        <CardHeader className=" my-8">
          <CardTitle className="text-4xl my-6 text-left font-bold">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-center text-gray-500 text-sm">
            provide your email so we can show you instructions on how to reset
            your password
          </CardDescription>
        </CardHeader>
        {}
        <CardContent className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" flex flex-col gap-3">
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
        </CardContent>
        <CardFooter className="flex  justify-center">
          <Button
            className="w-full bg-blue-600 text-white"
            // disabled={loading}
            disabled={false}
            type="submit"
          >
            {isLoading == "LOADING" && "Loading ..."}
            {/* {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />} */}
            Reset Password
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

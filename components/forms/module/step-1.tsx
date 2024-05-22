"use client"
import {useForm} from "react-hook-form";
import {FirstZodSchema, FormState, TFirstZodSchema} from "@/types/forms/module";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Dispatch, SetStateAction} from "react";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


type Props = {
    setStep:  Dispatch<SetStateAction<FormState>>
}
export const FirstStep = ({setStep}:Props) => {
    const form = useForm<TFirstZodSchema>({
        resolver: zodResolver(FirstZodSchema),
        defaultValues: {
            title: "",
            speciality: "",
            semester: 1,
            coefficient: 1,
            year: ""
        },
        mode:"onSubmit"
    })
    const submitHandler = (value : TFirstZodSchema) => {
        sessionStorage.setItem("module-1", JSON.stringify(value))
        toast.success("First Step Saved ✔️")
        setStep(() => FormState.ADVANCED)

    }
    return (
        <Form {...form} >
            <form className="flex flex-col gap-4 p-6" onSubmit={form.handleSubmit(submitHandler)}>
                <FormField render={({field}) => {
                    return (
                        <FormItem className="w-full">
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                                <Input {...field} id="title" type="text"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )
                }} name="title" control={form.control}/>
                <div className="flex justify-between items-center">

                    <FormField render={({field}) => {
                        return (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="year">Year</FormLabel>
                                <FormControl>
                                    <Input {...field} id="year" type="text"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }} name="year" control={form.control}/>
                    <FormField render={({field}) => {
                        return (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="title">Semester</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" max={2} min={1} defaultValue={1}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }} name="semester" control={form.control}/>
                </div>
                <div className="flex justify-between items-center">

                    <FormField render={({field}) => {
                        return (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="title">Coefficient</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" max={10} min={1} defaultValue={1}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }} name="coefficient" control={form.control}/>

                    <FormField render={({field}) => {
                        return (
                            <FormItem className="w-full">
                                <FormLabel htmlFor="title">Speciality</FormLabel>
                                <FormControl>
                                    <Input {...field} type="text" placeholder="if not , Keep it blank" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }} name="speciality" control={form.control}/>
                </div>
                <Button className="w-fit p-4 self-end" type="submit">
                        Next
                </Button>
            </form>
        </Form>
)
}
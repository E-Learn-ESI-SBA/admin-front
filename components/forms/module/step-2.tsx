import {Dispatch, SetStateAction} from "react";
import {FormState, SecondSchema, TSecondSchema} from "@/types/forms/module";
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {FileComp} from "@/components/common/file-overview";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {CircleCheck, Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "sonner";
import {Separator} from "@/components/ui/separator";
import {SelectedUser} from "@/types";
import MultipleSelector, {Option} from "@/components/ui/multi-select";

type Props = {
    setStep:  Dispatch<SetStateAction<FormState>>
    currentImage: File | null
    setCurrentImage: Dispatch<SetStateAction<File | null>>
}
export const SecondStep = ({setStep,setCurrentImage,currentImage}:Props) =>   {
    const MAX_FILE_SIZE = 4 * 1024 * 1024;
    const form = useForm<TSecondSchema>({
        mode:"onSubmit",
        resolver:zodResolver(SecondSchema),
        defaultValues:{
            points: [],
            description: ""
        }
    })
    const submitHandler = (value:TSecondSchema) => {
            sessionStorage.setItem("module-2",JSON.stringify(value))
            toast.success("Second Step Completed",{
                style:{
                    color:"white",
                    background:"green"
                }
            })
            setStep(FormState.CONFIRM)
    }
    const {fields,append,remove} = useFieldArray({
        control:form.control,
        name:"points"
    })
    const users:SelectedUser[] = [{
        email:"email@gmail.com",
        username:"hello",
        id:"1213"
    },
        {
            email:"email@gmail.com",
            username:"hello",
            id:"1213"
        },
        {
            email:"email@gmail.com",
            username:"hello",
            id:"1213"
        },
        {
            email:"email@gmail.com",
            username:"hello",
            id:"1213"
        },
    ]

    const options: Option[] = users.map((user) => ({
        label: user.username,
        value: user.id,
    }));
    return (
        <Form {...form}>
            <form className="w-full h-full p-4" onSubmit={form.handleSubmit(submitHandler)}>
                <div
                    className="flex flex-col gap-4 border justify-center relative items-center p-6 w-full min-h-[100px]">
                    {!currentImage ? (
                        <>
                            <Input
                                required
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.py,.java, .c, .cpp, .pas"
                                type="file"
                                className="w-fll absolute top-0 h-full  opacity-0"
                                onChange={(e) => {
                                    if (
                                        e.target.files &&
                                        e.target.files[0].size < MAX_FILE_SIZE
                                    ) {
                                        setCurrentImage(() =>
                                            e.target?.files ? e.target?.files[0] : null,
                                        );
                                    }
                                }}
                            />

                            <Label>Attached Image</Label>
                            <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                                browse and upload an image with size lower then 4MB
                            </p>
                        </>
                    ) : (
                        <FileComp f={currentImage} setCurrentFile={setCurrentImage}/>
                    )}
                </div>
            <Separator />
                <FormField render={({field}) => (
                    <FormItem>
                         <FormLabel>
                                Select Instructors
                         </FormLabel>
                        <FormControl>
                            <MultipleSelector
                                aria-label="Select groups"
                                className="z-10"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select instructors"
                                options={options}
                                defaultOptions={options}
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        no results found.
                                    </p>
                                }
                            />

                        </FormControl>
                    </FormItem>

                )} name="instructors" control={form.control} />
                <FormField
                    render={({ field }) => {
                        return (
                            <FormItem className="text-text-GRAY rounded-3xl ">
                                <FormLabel
                                    htmlFor="title"
                                    className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium my-4"
                                >
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Distributed Transactions"
                                        id="title"
                                        className="min-h-96 p-8 text-xs sm:text-sm text-black rounded-3xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                    name="description"
                    control={form.control}
                />
                    <div className="bg-white rounded-2xl p-6 flex flex-col gap-6">
                        <h5 className="text-secondary text-lg xl:text-3xl lg:text-xl font-medium">
                            What you will learn in this course :
                        </h5>
                        <div className="grid grid-cols-2  gap-4">
                            {fields.map((item, k) => {
                                return (
                                    <div className="flex gap-2 items-center" key={item.id}>
                                        <FormField
                                            name={`points.${k}.value`}
                                            render={({field}) => {
                                                console.log("Field", field, k);
                                                return (
                                                    <div
                                                        className="flex w-full items-center gap-2"
                                                        key={k}
                                                    >
                                                        <FormItem className="text-text-GRAY flex gap-2 rounded-3xl p-4">
                                                            <FormLabel htmlFor="title">
                                                                <CircleCheck
                                                                    className="w-8 h-8 text-white "
                                                                    fill="#0066FF"
                                                                />
                                                            </FormLabel>
                                                            <FormControl className="flex-1 w-full">
                                                                <Input
                                                                    {...field}
                                                                    placeholder="Distributed Transactions"
                                                                    id="title"
                                                                    className="text-sm md:text-base w-full"
                                                                />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    </div>
                                                );
                                            }}
                                            control={form.control}
                                            key={k}
                                        />
                                        <Button
                                            variant="ghost"
                                            disabled={fields.length < 2}
                                            className="p-4"
                                            onClick={() => {
                                                console.log("Delete Plan", k);
                                                remove(k);
                                            }}
                                            type="button"
                                        >
                                            <Trash className="text-red-origin w-4 h-4"/>
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                        <Button
                            className="flex mt-4 p-4 gap-2"
                            variant="ghost"
                            onClick={() =>
                                append({
                                    value: "",
                                })
                            }
                        >
                            Add Point
                            <Plus className="w-6 h-6 text-blue-origin"/>
                        </Button>
                    </div>

                <div className="flex justify-between">
                    <Button variant="ghost" className="p-4 w-fit" onClick={() => setStep(FormState.OVERVIEW)}>
                        Previous
                    </Button>
                    <Button className="p-4 w-fit" type="submit">
                                Next
                        </Button>
                </div>
            </form>
        </Form>
)
}



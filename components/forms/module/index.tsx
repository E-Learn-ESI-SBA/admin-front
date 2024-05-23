"use client"
import {useState} from "react";
import {FormState} from "@/types/forms/module";
import {Button} from "@/components/ui/button";
import {FirstStep} from "@/components/forms/module/step-1";
import {SecondStep} from "@/components/forms/module/step-2";

export default function CreateModule() {
    const [formState, setFormState] = useState<FormState>(FormState.OVERVIEW);
    const [currentImage, setCurrentImage] = useState<File|null>(null)
    return (
        <div className="flex flex-col gap-12 p-6">
            <div className="p-4 flex h-fit justify-between">
                <Button variant={formState === FormState.OVERVIEW ? "ghost": "default"} className="p-4 w-full">
                    Overview
                </Button>
                <Button variant={formState === FormState.CONFIRM ? "ghost": "default"} className="p-4 w-full">
                    Advanced
                </Button>
            </div>
                <div className="w-full h-full">

                {
                    formState === FormState.OVERVIEW && (<FirstStep setStep={setFormState} />)
                }
                {
                    formState === FormState.CONFIRM && (<SecondStep setStep={setFormState} currentImage={currentImage} setCurrentImage={setCurrentImage} />)
                }
                </div>
        </div>
    )
}
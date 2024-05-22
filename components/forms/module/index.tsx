"use client"

import {useState} from "react";
import {FormState} from "@/types/forms/module";


export default function CreateModule() {
    const [formState, setFormState] = useState<FormState>(FormState.OVERVIEW);
    return (
        <>
        </>
    )
}
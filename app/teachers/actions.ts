'use server'
import teachers from "@/static/dummy-data/teachers";
import { Teacher } from "@/types/teachers";
import axiosClient from "@/utils/axiosInstance";

export async function getStudents(): Promise<Teacher[]>{
    // const data = teachers;
    const response = await axiosClient.get('teachers')
    return response.data;
}
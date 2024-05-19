'use server'
import { Teacher, TeacherWithUser } from "@/types/teachers";
import axiosClient from "@/utils/axiosInstance";

export async function getTeachers(): Promise<Teacher[]> {
    'use server'
    try {
        const response = await axiosClient.get('teachers');
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching teachers");
    }
}

export async function getTeacherById(id: string): Promise<Teacher> {
    'use server'
    try {
        const response = await axiosClient.get(`teachers/${id}`);
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching teacher with id");
    }
}

export async function addTeacher(data: Teacher) {
    'use server'
    try {
        const response = await axiosClient.post('teachers/', data);
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw new Error('Failed to create new teacher');
    }
}

export async function deleteTeacher(id: string) {
    'use server'
    try {
        const response = await axiosClient.delete(`teachers/${id}/`);
        return response.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function updateTeacher(id: string, data: Partial<Teacher>) {
    'use server'
    try {
        console.log("data",data)
        const response = await axiosClient.patch(`teachers/${id}/`, data);
        return response.data;
    } catch (err: any) {
        console.log("err");
        console.log(err);
        // throw new Error(err.message);
    }
}

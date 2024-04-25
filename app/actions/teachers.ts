'use server'
import { Teacher, TeacherWithoutId } from "@/types/teachers";
import axiosClient from "@/utils/axiosInstance";

export async function getTeachers(): Promise<Teacher[]> {
    'use server'
    try {
        const response = await axiosClient.get('teachers')
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching teachers")
    }
}

export async function addTeacher(data: TeacherWithoutId) {
    'use server'
    try {
        const response = await axiosClient.post('teachers/', data)
        return response.data;
    } catch (err) {
        throw new Error('Failed to create new teacher')
    }
}

export async function deleteTeacher(id: string) {
    'use server'
    try {
        const response = await axiosClient.delete(`teachers/${id}`)
        return response.data;
    } catch (err) {
        throw new Error(`Failed to delete teacher with id= ${id}`)
    }
}

export async function updateTeacher(id: string, data: Teacher) {
    'use server'
    try {
        const response = await axiosClient.put(`teachers/${id}`, data)
        return response.data;
    } catch (err) {
        throw new Error(`Failed to update teacher with id= ${id}`)
    }
}
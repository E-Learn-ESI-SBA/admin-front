'use server'
import { Student, StudentWithoutId } from "@/types/students";
import axiosClient from "@/utils/axiosInstance";

export async function getStudent(): Promise<Student[]> {
    'use server'
    try {
        const response = await axiosClient.get('students')
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching students")
    }
}

export async function addStudent(data: StudentWithoutId) {
    'use server'
    try {
        const response = await axiosClient.post('students/', data)
        return response.data;
    } catch (err) {
        throw new Error('Failed to create new student')
    }
}

export async function deleteStudent(id: string) {
    'use server'
    try {
        const response = await axiosClient.delete(`students/${id}`)
        return response.data;
    } catch (err) {
        throw new Error(`Failed to delete student with id= ${id}`)
    }
}

export async function updateStudent(id: string, data: Student) {
    'use server'
    try {
        const response = await axiosClient.put(`students/${id}`, data)
        return response.data;
    } catch (err) {
        throw new Error(`Failed to update student with id= ${id}`)
    }
}
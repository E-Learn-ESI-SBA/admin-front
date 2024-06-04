'use server'
import { Student } from "@/types/students";
import { base_url } from '@/config/constants'; 
import axiosClient from "@/utils/axiosInstance";
 
export async function getStudents(): Promise<Student[]> {
    'use server'
    try {
        const response = await axiosClient.get('students');
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching students");
    }
}

export async function getStudentById(id: string): Promise<Student> {
    'use server'
    try {
        const response = await axiosClient.get(`students/${id}`);
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching student with id");
    }
}

export async function addStudent(data: Student) {
    'use server'
    try {
        const response = await axiosClient.post('students/', data);
        return response.data;
    } catch (err) {
        throw new Error('Failed to create new student');
    }
}

export async function addStudents(data: Student[]) {
    'use server'
    try {
        const response = await axiosClient.post('students/many/', data);
        return response.data;
    } catch (err: any) {
        console.log(err);
        throw new Error('Failed to create new students');
    }
}


export async function deleteStudent(id: string) {
    'use server'
    try {
        const response = await axiosClient.delete(`students/${id}/`);
        return response.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function updateStudent(id: string, data: Partial<Student>) {
    'use server'
    try {
        const response = await axiosClient.patch(`students/${id}/`, data);
        return response.data;
    } catch (err: any) {
        throw new Error(err.message);
    }
}

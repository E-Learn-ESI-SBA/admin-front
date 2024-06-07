'use server'
import { Student } from "@/types/students";
import { base_url, STAFF_BASE_URL } from '@/config/constants';
import axiosClient from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export async function getStudents(): Promise<Student[]> {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students`, {
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }
        });
        const response = await res.json();
        if (!res.ok) {
            throw new Error(response?.detail);
        }
        return response;
    } catch (err) {
        throw new Error("Failed in fetching students");
    }
}

export async function getStudentById(id: string): Promise<Student> {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies().get('accessToken')?.value}`
            }}
        );
        const response = await res.json();
        if (!res.ok) {
            throw new Error(response?.detail);
        }
        return response;
    } catch (err: any) {
        throw new Error(err?.message);
    }
}

export async function addStudent(data: Student) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if (!res.ok) {
            throw new Error(response?.detail);
        }
        return response;
    } catch (err) {
        throw new Error("Failed when adding student");
    }
}

export async function addStudents(data: Student[]) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if (!res.ok) {
            throw new Error(response?.detail);
        }
        return response;
    } catch (err) {
        throw new Error("Failed when adding students");
    }
}


export async function deleteStudent(id: string) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                'Content-Type': 'application/json'
            }
        });
        if(res.status !== 204) {
            throw new Error("Fadddddiled when Delting student");
        }
        return;
    } catch (err: any) {
        console.log(err?.message)
        throw new Error("Failed when Delting student");
    }
}

export async function updateStudent(id: string, data: Partial<Student>) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/students/${id}/`, {
            method: 'PATCH',
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        return;
    } catch (err) {
        throw new Error("Failed in fetching students");
    }
}
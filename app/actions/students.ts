'use server'
import { Student, StudentWithoutId } from "@/types/students";
import { base_url } from '@/config/constants'; 


async function handleResponse(response: Response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.detail || 'Something went wrong');
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
}


export async function getStudents(): Promise<Student[]> {
    'use server'
    try {
        const response = await fetch(`${base_url}/students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (err) {
        throw new Error("Failed in fetching students");
    }
}

export async function addStudent(data: StudentWithoutId) {
    'use server'
    try {
        const response = await fetch(`${base_url}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (err) {
        throw new Error('Failed to create new student');
    }
}

export async function deleteStudent(id: string) {
    'use server'
    try {
        const response = await fetch(`${base_url}/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const srvRes = await handleResponse(response);
        return srvRes
    } catch (err: any) {
        throw new Error(err.message);
    }
}

export async function updateStudent(id: string, data: Student) {
    'use server'
    try {
        const response = await fetch(`${base_url}/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await handleResponse(response);
    } catch (err) {
        throw new Error(`Failed to update student with id= ${id}`);
    }
}

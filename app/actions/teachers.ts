'use server'
import { Teacher, TeacherWithUser } from "@/types/teachers";
import { base_url, STAFF_BASE_URL } from '@/config/constants';
import axiosClient from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export async function getTeachers(): Promise<Teacher[]> {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers`, {
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
        throw new Error("Failed in fetching teachers");
    }
}

export async function getTeacherById(id: string): Promise<Teacher> {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers/${id}`, {
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
        throw new Error("Failed in fetching teacher with id");
    }
}

export async function addTeacher(data: Teacher) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers/`, {
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
        throw new Error('Failed to create new teacher');
    }
}

export async function addTeachers(data: Teacher[]) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers/many/`, {
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
        throw new Error('Failed to create new teachers');
    }
}


export async function deleteTeacher(id: string) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers/${id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
                'Content-Type': 'application/json'
            }
        });
        if(res.status !== 204) {
            throw new Error("Failed when deleting teacher");
        }
        return;
    } catch (err) {
        throw new Error("Failed when deleting teacher");
    }
}

export async function updateTeacher(id: string, data: Partial<Teacher>) {
    'use server'
    try {
        const res = await fetch(`${STAFF_BASE_URL}/teachers/${id}/`, {
            method: 'PATCH',
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
        throw new Error("Failed in updating teacher");
    }
}

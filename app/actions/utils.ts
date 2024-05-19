'use server'
import axiosClient from "@/utils/axiosInstance";


export async function getGroups(): Promise<string[]> {
    'use server'
    try {
        const response = await axiosClient.get('groups')
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching groups")
    }
}

export async function getPromos(): Promise<string[]> {
    'use server'
    try {
        const response = await axiosClient.get('promos')
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching promos")
    }
}

export async function getYears(): Promise<string[]> {
    'use server'
    try {
        const response = await axiosClient.get('years')
        return response.data;
    } catch (err) {
        throw new Error("Failed in fetching years")
    }
}
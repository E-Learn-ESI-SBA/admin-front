'use server'
import { TAuthSchema } from "@/components/auth/login";
import { STAFF_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";


export interface StoreTokenRequest {
    access: string;
    refresh: string;
}

export async function storeToken(request: StoreTokenRequest) {
    "use server";
    console.log(request);
    cookies().set({
        name: "accessToken",
        value: request.access,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });

    cookies().set({
        name: "refreshToken",
        value: request.refresh,
        httpOnly: true,
        sameSite: "strict",
        secure: true,
    });
}

export async function login(data: TAuthSchema) {
    "use server";
    try {
        const response = await fetch(`${STAFF_BASE_URL}/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const res: StoreTokenRequest = await response.json();
        await storeToken(res);
        return res;
    } catch (err) {
        console.log(err);
        throw new Error("couldn't login");
    }
}
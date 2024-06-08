'use server'
import { TAuthSchema } from "@/components/auth/login";
import { STAFF_BASE_URL } from "@/config/constants";
import { cookies } from "next/headers";
import { TPayload } from "@/types";
import { jwtVerify } from "jose";
import { cache } from "react";


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
        const response = await fetch(`${STAFF_BASE_URL}/auth/admin-login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("couldn't login");
        }
        const res: StoreTokenRequest = await response.json();
        await storeToken(res);
        return res;
    } catch (err) {
        throw new Error("couldn't login");
    }
}


export async function logout(): Promise<Boolean> {
    "use server"
    try {
        cookies().delete("accessToken");
        cookies().delete("refreshToken");
        cookies().delete("csrftoken");
        return true;
    } catch (e) {
        return false;
    }
}



export async function getAuth(): Promise<{ isAuth: boolean; payload: TPayload | null }> {
    try {
      const cookie = cookies();
      const token = cookie.get("accessToken")?.value;
      if (!token) return { isAuth: false, payload: null };
  
      const jwtKey = process.env.JWT_SECRET ?? "aTZ6czFOcTFHekRrZEJHUTB5cFlZZ0M1aXQyR3FiNlltaWx5aDJFUWpIQT0K";
      const claim = await jwtVerify<TPayload>(token, new TextEncoder().encode(jwtKey));
      const strPayload = JSON.stringify(claim.payload);
  
  
      return { isAuth: true, payload: claim.payload };
    } catch (e) {
      console.log("Error:", e);
      return { isAuth: false, payload: null };
    }
  };
  
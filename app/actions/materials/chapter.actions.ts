"use server";
import { cookies } from "next/headers";
import { GET_COURSES } from "@/config/urls/materials";
import { IResponse } from "@/types/http";
import { IError } from "@/types/errors";
import {Chapter} from "@/types/modules";

export const getCourses = async (): Promise<IResponse<Required<Chapter>[]>> => {
    try {
        const response = await fetch(GET_COURSES, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
            },
        });
        const res = (await response.json()) as {
            data?: Required<Chapter>[];
            message?: string;
        };
        if (!response.ok) {
            return {
                status: response.status,
                data: [],
                error: new IError({
                    message: res.message ?? "Error While Getting modules",
                }),
            };
        }
        if (res.data) {
            return {
                status: response.status,
                data: res.data,
                error: null,
            };
        }
        return {
            data: [],
            error: new IError({message:"Error While Getting modules"}),
            status: response.status,
        };
    } catch (e) {
        console.log("error", e);
        const err = new IError(e);
        return {
            status: 500,
            error: err,
            data: [],
        };
    }
};
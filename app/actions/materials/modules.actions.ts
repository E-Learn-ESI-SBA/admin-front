"use server";
import { cookies } from "next/headers";
import {DELETE_MODULE, GET_MODULE} from "@/config/urls/materials";
import { Module } from "@/types/modules";
import {IMessage, IResponse} from "@/types/http";
import { IError } from "@/types/errors";

export const getModules = async (): Promise<IResponse<Required<Module>[]>> => {
    try {
        const response = await fetch(GET_MODULE, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
            },
        });
        const res = (await response.json()) as {
            data?: Required<Module>[];
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

export const deleteModule  = async (id:string):Promise<IResponse<IMessage>> => {
    try {
        const response = await fetch(`${DELETE_MODULE}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
            },
        });
        const res = (await response.json()) as {
            message: string;
        };
        if (!response.ok) {
            return {
                data: {message:""},
                status: response.status,
                error: new IError({
                    message: res.message ?? "Error While Getting modules",
                }),
            };
        }
        if (res.message) {
            return {
                status: response.status,
                data: res,
                error: null,
            };
        }
        return {
            data: res,
            error: new IError({message:"Error While Getting modules"}),
            status: response.status,
        };
    } catch (e) {
        console.log("error", e);
        const err = new IError(e);
        return {
            status: 500,
            error: err,
            data: {message:""}
        };
    }
}
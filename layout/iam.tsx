"use client"
import {PropsWithChildren, useEffect} from "react";
import permit, {LoginMethod} from "@permitio/permit-js";

type Props = PropsWithChildren &{
    url?:string
}
export function IAMWrapper({url,children}:Props) {
    useEffect(() => {
    console.log("URL",url)
    if (!!url) {
        try {
        permit.elements.login({
            tenant:"default",
            loginUrl:url,
            loginMethod:LoginMethod.cookie
        })
        } catch (e) {
            console.log("ERROR",e)
        }
    }
    })
    return(
        <>
            {children}
        </>
    )

}
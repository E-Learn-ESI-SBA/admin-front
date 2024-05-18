import {cookies} from "next/headers";
import {Permit} from "permitio";
import {IPayload} from "@/types";

export async function GET(request:Request) {
    try {
        console.log('HERE ...')
        const permit = new Permit({
            token:process.env.PERMIT_TOKEN ?? "",
        });
    const payload = cookies().get("payload")?.value
     console.log(payload)
    /*
    if (!payload) {
        return new Response(JSON.stringify({message: "UNAUTHORIZED, No payload is provided"}), {status: 401})
    }
    const parsedPayload = JSON.parse(payload) as IPayload

    }
     */
  const res =   await permit.elements.loginAs({userId:"2",tenantId:"default"})
    return new Response(JSON.stringify({url:res.redirect_url}),{status:200})
    }catch (e) {
        console.log("GET PERMIT ELEMENT ERROR",e)
    }
}
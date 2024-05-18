"use client"
import {RBAC_URL} from "@/config/secrets";

export  function DefaultRbac() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-2xl">
        <iframe

            title="Default Role Based Access Control"
            src={RBAC_URL}
            width="100%"
            height="100%"
            style={
            {
                border:"none"
            }
            }/>
        </div>
    )
}
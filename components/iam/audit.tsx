"use client"

export  function Audit() {
    return (
        <div className="w-full h-full p-4 bg-white rounded-2xl">
            <iframe
                title="Permit Element audit"
                src="https://embed.permit.io/audit?envId=6b2f1b047b6b4143bd45d7201f818814&darkMode=false"
                width="100%"
                height="100%"
                style={{
                    border:"none"
                }}/>
        </div>
    )
}
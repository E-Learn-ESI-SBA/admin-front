import {Audit} from "@/components/iam/audit";

export const dynamic = "force-dynamic";
export default function AuditPage() {
    return (
        <main className="p-12 bg-secondary-background flex w-full h-screen items-center justify-center">
            <Audit />
        </main>
    )
}
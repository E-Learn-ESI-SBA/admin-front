import { DefaultRbac } from "@/components/iam/rbac";

export const dynamic = "force-dynamic";
const DefaultRBacPage = () => {
    return (
        <main className="p-12 bg-secondary-background flex w-full h-screen items-center justify-center">
            <DefaultRbac />
        </main>
    )
}

export default DefaultRBacPage;
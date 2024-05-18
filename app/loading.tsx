import GridLoader from "@/components/icons/grid";

export default function LoadingPage() {
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <GridLoader />
        </div>
    );
}
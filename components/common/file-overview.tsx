import { Delete, File, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { humanFileSize } from "@/utils/utils";

export const FileComp = ({
                             f,
                             setCurrentFile,
                             loadType = "FILE",
                         }: {
    f: File;
    setCurrentFile: Dispatch<SetStateAction<File | null>>;
    loadType?: "VIDEO" | "FILE";
}) => {
    return (
        <div className="flex justify-between w-full items-center gap-4 ">
            <div className="flex items-center gap-2 p-2">
                {loadType === "VIDEO" ? (
                    <Film className="text-purple-origin w-8 h-8" />
                ) : (
                    <File className="text-green-origin w-8 h-8" />
                )}
                <div className="flex flex-col gap-px  ">
                    <p className="text-xs  text-gray-600 dark:text-gray-400">
                        name: {f.name.slice(1, f.name.length / 6)}
                    </p>
                    <p className="text-xs  text-gray-600 dark:text-gray-400">
                        Type : {f.type.split("/")[1]}
                    </p>
                    <p className="text-xs  text-gray-600 dark:text-gray-400">
                        Size: {humanFileSize(f.size)}
                    </p>
                </div>
            </div>
            <Button
                variant="ghost"
                onClick={() => {
                    setCurrentFile(() => null);
                }}
            >
                <Delete className="text-red-origin w-8 h-8" />
            </Button>
        </div>
    );
};
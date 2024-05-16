import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PropsWithChildren } from "react";
type Props = PropsWithChildren & {
    title: string;
    desc: string;
    modalHandler: () => void;
    open: boolean;
    isLoading?: boolean;
    onOpenChange: (open: boolean) => void;
    withTrigger?: boolean;
};
export function AlertModal({
                               title,
                               desc,
                               children,
                               modalHandler,
                               withTrigger = false,
                               open = false,
                               isLoading = false,
                               onOpenChange = (open: boolean) => {},
                           }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {withTrigger && (
                <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{desc}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        className="bg-red-600 text-white"
                        onClick={modalHandler}
                    >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
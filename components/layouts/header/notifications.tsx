import { BellIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
];

type CardProps = React.ComponentProps<typeof Card>;

export function Notifications({ className, ...props }: CardProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <BellIcon  className="cursor-pointer w-6 h-6 text-blue-origin" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[240px] bg-white p-2"
                align="end"
                forceMount
            >
                <Card className={cn("w-full", className)} {...props}>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>You have 3 unread messages.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-origin" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>

                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
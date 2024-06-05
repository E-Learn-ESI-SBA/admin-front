"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";

export function UserNav() {

    const router = useRouter();
    const { clearUser, user } = useUserStore(state => ({
        user: state.user,
        clearUser: state.clearUser

    }))
    const logOutHandler = () => {
        jsCookie.remove("accessToken");
        jsCookie.remove("payload");
        jsCookie.remove("refreshToken");
        router.replace("/");
        clearUser()
    };
    if (!user) return <></>
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none">
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                    <Avatar className="h-10 w-10">
                        {user.avatar ?
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            :
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                        }
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            href="/app/profile"
                            className="flex justify-between w-full items-center"
                        >
                            Profile
                            <DropdownMenuShortcut>
                                <AvatarIcon />
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            href="/app/settings"
                            className="flex justify-between w-full items-center"
                        >
                            Settings
                        </Link>
                        <DropdownMenuShortcut>
                            <GearIcon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOutHandler}>
                    Log out
                    <DropdownMenuShortcut>
                        <ExitIcon />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
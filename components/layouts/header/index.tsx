import { Notifications } from "./notifications";
import { UserNav } from "./user-menu";

export default function Header() {
    return (
        <header className="p-4 sticky top-0 left-0 flex items-center justify-end z-40 bg-white gap-5">
                    <Notifications />
                    <UserNav />
        </header>
    );
}
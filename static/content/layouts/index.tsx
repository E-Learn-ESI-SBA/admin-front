import { SideBarItem } from "@/types";

export const sideBarItems: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: "menu",
    url: "/app/u/s",
  },
  {
    label: "Courses",
    icon: "courses",
    url: "/dashboard/student/courses",
  },
  {
    label: "Discussion",
    icon: "discussions",
    url: "/dashboard/student/discussion",
  },
  {
    label: "Schedules",
    icon: "schedules",
    url: "/dashboard/student/schedules",
  },
  {
    label: "My Account",
    icon: "profile",
    url: "/dashboard/student/account",
  },
  {
    label: "Settings",
    icon: "settings",
    url: "/dashboard/student/settings",
  },
];

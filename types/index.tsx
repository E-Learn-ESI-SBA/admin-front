// Sidebar types -->
export interface SideBarItem {
    label: string;
    icon:
      | "menu"
      | "courses"
      | "profile"
      | "settings"
      | "logout"
      | "discussions"
      | "schedules";
    url: string;
    isActive?: boolean;
  }
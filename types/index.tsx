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

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  birth_date?: string;
  city?: string;
  gender?: string;
  phone_number?: string;
  password?: string;
}
export interface IPayload {
    id: string;
    email:string
    username:string
    year:string
    group:string
    role:string
    
}
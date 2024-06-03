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

  // User
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


export type TPayload = {
  id: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
  group: string;
  year: string;
  username: string;
  avatar:string
};

export interface IPayload {
    id: string;
    email:string
    username:string
    year:string
    group:string
    role:string
    
}

export interface SelectedUser {
    email:string
    username:string
    id:string
}

export type FConfig = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string

}
import { Option } from "@/components/ui/multi-select";
import { User } from ".";

export interface Student {
  user: User;
  promo: string;
  group: string;
  registration_number: string;
}


export interface StudentWithoutId {
  user: User
  promo: string;
  group: string;
  registration_number: string;
}

export interface StudentWithUser extends Student, User {}

export interface TeacherWithUserWithoutId extends StudentWithoutId, User {}



export enum Class {
  first_year = "first_year",
  second_year = "second_year",
  third_year = "third_year",
  fourth_year = "fourth_year",
  fifth_year = "fifth_year",
}
export enum City {
  ALGER = "ALGER",
  SIDI_BEL_Abbes = "SIDI_BEL_Abbes",
}
export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}
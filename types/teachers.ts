import { Option } from "@/components/ui/multi-select";
import { User } from ".";

export interface Teacher {
    user: User | Partial<User>;
  }


export interface TeacherWithUser extends User {
    courses?: string[];
    classes?: string[];
    position?: string;
}
// export interface TeacherWithoutId {
//     user: User;
//     courses?: Option[];
//     classes?: Option[];
//     points?: number;
//   }

// export interface TeacherWithUser extends Teacher, User {}

// export interface TeacherWithUserWithoutId extends TeacherWithoutId, User {}

  export enum Class {
    first_year = "1CP",
    second_year = "2CP",
    third_year = "1CS",
    fourth_year = "2CS",
    fifth_year = "3CS",
  }
  export enum Course {
    ARCHITECTURE_EVOLUEE = "Architecture évoluée",
    Reaseau = "Reaseu",
    Analyse = "Analyse",
  }
  export enum City {
    ALGER = "Alger",
    SIDI_BEL_Abbes = "Sidi Bel Abbes",
  }
  export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
  }
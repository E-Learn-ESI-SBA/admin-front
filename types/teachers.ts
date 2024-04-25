import { User } from ".";

export interface Teacher {
    id: string;
    user: User;
    courses?: Course;
    classes?: Class;
    points?: number;
  }

export interface TeacherWithUser extends Teacher, User {}
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
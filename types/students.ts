  export interface Student {
    id: string;
    name: string;
    class: Class;
    email: string;
    gender: Gender;
    points: number;
    city: City;
    phone_number: number;
    password?: string;
  }


  export enum Class {
    first_year = "1CP",
    second_year = "2CP",
    third_year = "1CS",
    fourth_year = "2CS",
    fifth_year = "3CS",
  }
  export enum City {
    ALGER = "Alger",
    SIDI_BEL_Abbes = "Sidi Bel Abbes",
  }
  export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
  }
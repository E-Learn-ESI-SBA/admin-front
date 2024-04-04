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
    MALE = "MALE",
    FEMALE = "FEMALE",
  }
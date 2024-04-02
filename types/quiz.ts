export interface IQuiz {
    id: string;
    title: string;
    description: string;
    duration: number;
    category: string;
    image: string;
    startDate: string;
    endDate: string;
    questions: number;
    module_name: string;
    publisher: string;
    state: QuizState;
    points: number;
    attempts: number;
  }
  export enum QuizState {
    UPCOMING = "UPCOMING",
    ONGOING = "ONGOING",
    FINISHED = "FINISHED",
  }
  
  export interface IQuestion {
    id: string;
    question: string;
    description: string;
  }
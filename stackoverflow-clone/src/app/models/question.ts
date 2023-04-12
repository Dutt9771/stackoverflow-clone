export interface Question {
    userId: number;
    title: string;
    body: string;
    createdAt: Date;
    answers: any[];
  }
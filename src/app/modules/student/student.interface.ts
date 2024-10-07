import { Types } from 'mongoose'

export type TStudent = {
    user: Types.ObjectId,
    email: string;
    name: string;
    description: string;
    courseGrades: {
        course: Types.ObjectId,
        grade: string
    }[];
    events: {
        name: string,
        date: string;
        description: string;
      }[]; 
  }
import { model, Schema } from "mongoose";
import { TStudent } from "./student.interface";

const studentSchema = new Schema<TStudent>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'AllUser',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: { type: String, required: true },
    description: { type: String, required: true },
    courseGrades: [
      { 
       course: { type: Schema.Types.ObjectId, ref: "Course"},
        grade: { type: String }
      }
    ],
    events: [
      {
        name: {type: String, require: true},
        date: { type: String, required: true }, 
        description: { type: String, required: true }, 
      }
    ],
  });
  

  export const StudentModel = model<TStudent>("Student", studentSchema);
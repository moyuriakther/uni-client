import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";

const facultySchema = new Schema<TFaculty>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'AllUser',
  },
  email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    subjects: {
        type: [String], 
        required: true 
    },
    officeHours: {
         type: String, 
         required: true 
        },
    contact: { 
        type: String, 
        required: true 
    }
    },
     {
        timestamps: true,
      },
    )

    export const FacultyModel = model<TFaculty>('Faculty', facultySchema)
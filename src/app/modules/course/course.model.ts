import { model, Schema } from "mongoose";
import { TCourse } from "./course.interface";

const courseSchema = new Schema<TCourse>({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    faculty: { 
      type: Schema.Types.ObjectId,
      ref: 'Faculty' },
    },
     {
        timestamps: true,
      },
    )

    export const CourseModel = model<TCourse>('Course', courseSchema)
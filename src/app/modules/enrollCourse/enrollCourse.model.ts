import { model, Schema } from "mongoose"
import { TEnrolledCourse } from "./enrollCourse.interface"

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
    isEnrolled: {
      type: Boolean,
      default: false,
    },
   

  })
  export const EnrolledCourseModel = model<TEnrolledCourse>(
    'EnrolledCourse',
    enrolledCourseSchema,
  )
  
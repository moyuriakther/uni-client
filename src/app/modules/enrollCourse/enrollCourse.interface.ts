import { Types } from "mongoose"

export type TEnrolledCourse = {
    course: Types.ObjectId
    student: Types.ObjectId
    faculty: Types.ObjectId
    isEnrolled: boolean
  }
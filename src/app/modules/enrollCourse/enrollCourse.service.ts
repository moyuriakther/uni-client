import httpStatus from "http-status"
import AppError from "../../error/AppError"
import { CourseModel } from "../course/course.model"
import { StudentModel } from "../student/student.modal"
import { EnrolledCourseModel } from "./enrollCourse.model"
import { UserModel } from "../user/user.model"

const enrolledCourse = async (
    payload: any,
  ) => {
    /**
     * Step1: Check if the offered cousres is exists
     * Step2: Check if the student is already enrolled
     * Step3: Create an enrolled course
     */
    const { course } = payload
    // console.log({course})
    const isCourseExist = await CourseModel.findById(course)
    if (!isCourseExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course Not Found')
    }
  
    const student = await StudentModel.findOne({_id: payload.student});
    console.log({student})
    if(!student){
        throw new AppError(httpStatus.NOT_FOUND, 'Student Not Found');
    }
    // console.log({student})

    const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
      student: student?._id,
      course,
    })
    if (isStudentAlreadyEnrolled) {
      throw new AppError(httpStatus.CONFLICT, 'Student Already Enrolled')
    }
    const updatedStudent = await StudentModel.findOneAndUpdate(
        { 
          _id: student._id, 
          "courseGrades.course": { $ne: course } 
        },
        {
          $addToSet: { courseGrades: { course } },
        },
        { new: true }
      );
  console.log({updatedStudent})
    //   return updatedStudent;
      // Step 5: Create an enrolled course record in EnrolledCourseModel
  const result = await EnrolledCourseModel.create({ ...payload, student: student._id });
  console.log(result)
  return result;
  }

  export const enrolledCourseServices = {
   enrolledCourse, 
  }


import { TCourse } from "./course.interface"
import { CourseModel } from "./course.model"

const createCourse = async (payload: TCourse) => {
  console.log(payload)
    const result = await CourseModel.create(payload)
    console.log({result})
    return result
  }
const getAllCourse = async () =>{
  const result = await CourseModel.find().populate("faculty");
  return result;
}

  export const CourseServices = {
    createCourse,
    getAllCourse
  }
  
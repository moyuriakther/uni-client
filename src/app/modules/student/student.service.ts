import httpStatus from "http-status"
import AppError from "../../error/AppError"
import { TStudent } from "./student.interface"
import { StudentModel } from "./student.modal"

const createStudent = async (payload: TStudent) => {
    const result = await StudentModel.create(payload)
    return result
  }
const getAllStudents = async (req: any) => {
    const result = await StudentModel.find().populate({
      path: "courseGrades.course",
      populate: {
        path: 'faculty'
      }
    }).populate("user");
    return result
  }
const updateGrade = async(req:any) =>{
  const {courseId, grade} = req.body;
  const student = await StudentModel.findOne({email: req.params.email});
  if(!student){
    throw new AppError(httpStatus.NOT_FOUND, 'student not found');
  }
  const courseEntry = student.courseGrades.find(entry => entry.course.toString() === courseId);
  if (!courseEntry) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found for this student');
  }


  const result = await StudentModel.findOneAndUpdate(
    { _id: student._id, "courseGrades.course": courseId },
    { $set: { "courseGrades.$.grade": grade } },
    { new: true, runValidators: true }
  );
 return result;
}
const addEvent = async(req:any) =>{
  const {name, date, description} = req.body;
  const student = await StudentModel.findOne({email: req.params.email});
  if(!student){
    throw new AppError(httpStatus.NOT_FOUND, 'student not found');
  }
  const result = await StudentModel.findOneAndUpdate( { 
    _id: student._id, 
    // "courseGrades.course": { $ne: course } 
  },
  {
    $addToSet: { events: { name, date, description } },
  },
  { new: true })
    console.log({result})
  return result;
}




  export const StudentServices = {
    createStudent,
    getAllStudents,
    updateGrade,
    addEvent
  }
  
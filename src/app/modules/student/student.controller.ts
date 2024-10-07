import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StudentServices } from "./student.service"

const createStudent = catchAsync(async (req, res) => {
    const result = await StudentServices.createStudent(req.body)
    sendResponse(res, {
      success: true,
      message: 'Student is Created Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudents(req)
    sendResponse(res, {
      success: true,
      message: 'Student data retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const updateStudentGrade = catchAsync(async (req, res) => {
    const result = await StudentServices.updateGrade(req)
    sendResponse(res, {
      success: true,
      message: 'Student grade Updated Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const updateStudentEvent = catchAsync(async (req, res) => {
    const result = await StudentServices.addEvent(req)
    sendResponse(res, {
      success: true,
      message: 'Student Event Updated Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })



  export const StudentControllers = {
    createStudent,
    getAllStudents,
    updateStudentGrade,
    updateStudentEvent

  }
  
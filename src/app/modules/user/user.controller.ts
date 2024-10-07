import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { UserServices } from "./user.service"

const createStudent = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body
    console.log(req.body)
    const result = await UserServices.createStudentInfo(
    //   req.file,
      password,
      studentData,
    )
    sendResponse(res, {
      success: true,
      message: 'Student Created Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body
    // console.log(req.body)
    const result = await UserServices.createFaculty(
      password,
      facultyData,
    )
    sendResponse(res, {
      success: true,
      message: 'Faculty Created Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const allUsers = catchAsync(async (req, res) => {
    const result = await UserServices.allUsers()
    sendResponse(res, {
      success: true,
      message: 'Student data Retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
  export const UserController = {
    createStudent,
    createFaculty,
    allUsers
}

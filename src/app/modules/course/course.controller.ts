import httpStatus from "http-status"
import { CourseServices } from "./course.service"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourse(req.body)
    sendResponse(res, {
      success: true,
      message: 'Course is Created Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const getAllCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourse()
    sendResponse(res, {
      success: true,
      message: 'Course Retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })



  export const CourseControllers = {
    createCourse,
    getAllCourse
  }
  
import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { FacultyServices } from "./faculty.service"

const createFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.createFaculty(req.body)
    sendResponse(res, {
      success: true,
      message: 'Faculty is Created Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })
const getAllFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFaculty()
    sendResponse(res, {
      success: true,
      message: 'Faculty data retrieved Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })



  export const FacultyControllers = {
    createFaculty,
    getAllFaculty
  }
  
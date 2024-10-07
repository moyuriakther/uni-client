import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { enrolledCourseServices } from "./enrollCourse.service"

const createEnrolledCourse = catchAsync(async (req, res) => {
    const result = await enrolledCourseServices.enrolledCourse(
      req.body,
    )
    //send response
    sendResponse(res, {
      success: true,
      message: 'Create Enrolled Course Successfully',
      statusCode: httpStatus.OK,
      data: result,
    })
  })

  export const enrolledCourseControllers = {
    createEnrolledCourse,
  }
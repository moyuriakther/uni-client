import httpStatus from "http-status"
import config from "../../config"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthService } from "./auth.service"

const loginUser = catchAsync(async (req, res) => {
    // console.log(req.body)
    const result = await AuthService.loginUser(req.body)
    //set refresh token to cookie
    const {refreshToken, accessToken} = result
    res.cookie('refreshToken', refreshToken, {
      secure: config.node_env === 'production',
      httpOnly: true
    })
    
    sendResponse(res, {
      success: true,
      message: 'Login Successfully',
      statusCode: httpStatus.OK,
      data: {accessToken},
    })
  })

    export const AuthController = {
        loginUser,
    }
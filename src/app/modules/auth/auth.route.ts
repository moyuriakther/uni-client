import validateRequest from "../../middleware/validateRequest"
import { AuthController } from "./auth.controller"
import { AuthValidation } from "./auth.validation"
import express from 'express'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.userLoginValidationSchema),
  AuthController.loginUser,
)

export const AuthRoutes = router
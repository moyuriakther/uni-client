import express from 'express'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'
import { enrolledCourseControllers } from './enrollCourse.controller'

const router = express.Router()

//will call controller function
router.post(
  '/',
  auth(USER_ROLE.student),
  enrolledCourseControllers.createEnrolledCourse,
)

export const EnrolledCourseRoutes = router
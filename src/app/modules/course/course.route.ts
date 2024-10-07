import express from 'express'
import { CourseControllers } from './course.controller'

const router = express.Router()

router.get("/", CourseControllers.getAllCourse)
router.post("/", CourseControllers.createCourse)

export const CourseRoutes = router
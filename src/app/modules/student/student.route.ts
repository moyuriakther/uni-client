import express from 'express'
import { StudentControllers } from './student.controller'



const router = express.Router()

router.get("/", StudentControllers.getAllStudents)
router.get("/", StudentControllers.getAllStudents)
router.post("/", StudentControllers.createStudent)
router.put("/:email/grade", StudentControllers.updateStudentGrade)
router.patch("/:email/event", StudentControllers.updateStudentEvent)

export const StudentRoutes = router
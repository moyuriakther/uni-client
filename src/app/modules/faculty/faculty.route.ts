import express from 'express'
import { FacultyControllers } from './faculty.controller'


const router = express.Router()

router.get("/", FacultyControllers.getAllFaculty)
router.post("/", FacultyControllers.createFaculty)

export const FacultyRoutes = router
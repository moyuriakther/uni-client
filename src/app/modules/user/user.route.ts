import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.get("/", UserController.allUsers)
router.post(
  '/create-student',
//   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data)
//     next()
//   },
//   validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
)
router.post("/create-faculty", UserController.createFaculty)

export const UserRoutes = router
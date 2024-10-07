import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { FacultyRoutes } from "../modules/faculty/faculty.route";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { EnrolledCourseRoutes } from "../modules/enrollCourse/enrollCourse.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/course',
        route: CourseRoutes,
    },
    {
        path: '/faculty',
        route: FacultyRoutes,
    },
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/user',
        route: UserRoutes,
    },
    {
        path: '/enrolled-course',
        route: EnrolledCourseRoutes,
      },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
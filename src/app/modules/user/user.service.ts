import httpStatus from "http-status"
import config from "../../config"
import AppError from "../../error/AppError"
import { TStudent } from "../student/student.interface"
import { TUser } from "./user.interface"
import { UserModel } from "./user.model"
import mongoose from "mongoose"
import { StudentModel } from "../student/student.modal"
import { FacultyModel } from "../faculty/faculty.model"

const createStudentInfo = async (
    // file: any,
    password: string,
    payload: any,
  ) => {
    const userData: Partial<TUser> = {}
    // if password not given use default password
    userData.password = password || (config.default_pass as string)
    userData.role = 'student' //set student role
    userData.email = payload.email
  
    const isUserExist = await UserModel.findOne({email: payload.email})
  
    if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User already exist')
    }
  
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
  
    //   if (file) {
    //     const path = file?.path
    //     const imageName = `${userData?.id}${payload.name.firstName}`
    //     //send image to cloudinary
    //     const { secure_url } = await sendImgToCloudinary(path, imageName)
    //     payload.profileImg = secure_url as string // set profile image link
    //   }
  
      //create a user
      const newUser = await UserModel.create([userData], { session }) // built in static method
      if (!newUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
      }
      // create a student
      if (newUser.length) {
        //set id, _id as user to student data
        
        payload.user = newUser[0]._id //reference id
        const newStudent = await StudentModel.create([payload], { session })
        if (!newStudent) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
        }
        await session.commitTransaction()
        await session.endSession()
        return newStudent
      }
    } catch (error) {
      await session.abortTransaction()
      await session.endSession()
      throw new Error('Failed to Create Student')
    }
  }
  const createFaculty = async (
    // file: any,
    password: string,
    payload: any,
  ) => {
    const userData: Partial<TUser> = {}
    // if password not given use default password
    // console.log(password, payload)
    userData.password = password || (config.default_pass as string)
    userData.role = 'faculty' //set faculty role
    userData.email = payload.email
//   console.log({userData})
    const isUserExist = await UserModel.findOne({email: payload.email})
    // console.log({isUserExist})
    if (isUserExist) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User already exist')
    }
  
    const session = await mongoose.startSession()
    try {
      session.startTransaction()
  
    //   if (file) {
    //     const path = file?.path
    //     const imageName = `${facultyData?.id}${payload.name.firstName}`
    //     //send image to cloudinary
    //     const { secure_url } = await sendImgToCloudinary(path, imageName)
    //     payload.profileImg = secure_url as string // set profile image link
    //   }
  
      //create a user
      const newUser = await UserModel.create([userData], { session }) // built in static method
    //   console.log({newUser})
      if (!newUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
      }
      // create a faculty
      if (newUser.length) {
        //set id, _id as user to faculty data
        
        payload.user = newUser[0]._id //reference id
        // const {email, ...restFaculty} = payload
        // console.log({restFaculty})
        const newFaculty = await FacultyModel.create([payload], { session })
        console.log({newFaculty})
        if (!newFaculty) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty')
        }
        await session.commitTransaction()
        await session.endSession()
        return newFaculty
      }
    } catch (error) {
        console.log(error)
      await session.abortTransaction()
      await session.endSession()
      throw new Error('Failed to Create Faculty')
    }
  }
const allUsers = async() =>{
    return await UserModel.find();
}

  export const UserServices = {
    createStudentInfo,
    createFaculty,
    allUsers
}
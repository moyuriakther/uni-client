import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant"


export interface TUser {
    email: string
    password: string
    role: 'student' | 'faculty' | 'superAdmin'
    isDeleted: boolean
  }

  export interface IUserModel extends Model<TUser> {
    isUserExistByEmail(email: string): Promise<TUser>
    isUserDeleted(user: TUser): Promise<boolean>
    isPasswordMatched(plainTextPass: string, hashPass: string): Promise<boolean>
  }
  
  export type TUserRole = keyof typeof USER_ROLE
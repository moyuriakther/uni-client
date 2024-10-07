import { Types } from 'mongoose'

export type TFaculty = {
  user: Types.ObjectId,
  email: string
    name: string,
    designation: string,
    subjects: [string],
    officeHours: string,
    contact: string,
  }
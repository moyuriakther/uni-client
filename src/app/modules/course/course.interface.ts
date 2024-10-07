import { Types } from 'mongoose'

export type TCourse = {
    name: string
    description: string
    faculty: Types.ObjectId
  }
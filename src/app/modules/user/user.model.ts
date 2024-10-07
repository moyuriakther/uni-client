import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>(
    {
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
        select: 0,
      },
      role: {
        type: String,
        enum: {
          values: ['student', 'faculty', 'superAdmin'],
          message: '{VALUES} is not valid',
        },
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  )

  //pre middleware and document middleware
userSchema.pre('save', async function (next) {
    //hashing password and save to DB
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    )
    next()
  })
  //post middleware and document middleware
  userSchema.post('save', async function (doc, next) {
    doc.password = ''
    next()
  })

// create static
userSchema.statics.isUserExistByEmail = async function (email) {
  return await UserModel.findOne({ email }).select('+password')
}

userSchema.statics.isUserDeleted = async function (user) {
  return await user?.isDeleted
}

  userSchema.statics.isPasswordMatched = async function (
    plainTextPass,
    hashPass,
  ) {
    return await bcrypt.compare(plainTextPass, hashPass)
  }
export const UserModel = model<TUser, IUserModel>('AllUser', userSchema)
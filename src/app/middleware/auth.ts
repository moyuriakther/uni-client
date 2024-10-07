import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

import { TUserRole } from '../modules/user/user.interface'
import catchAsync from '../utils/catchAsync'
import { UserModel } from '../modules/user/user.model'
import AppError from '../error/AppError'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
console.log({token})
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!')
    }

    // checking if the given token is valid
    let decoded
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }

    const { role, email } = decoded

    // checking if the user is exist
    const user = await UserModel.isUserExistByEmail(email)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are Unauthorized To Access This Route!',
      )
    }

    req.user = decoded as JwtPayload
    next()
  })
}

export default auth

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import AppError from '../error/AppError';
import { TErrorSource } from '../interface/error';
import ValidationErrorHandler from '../error/validationErrorHandler';
import CastErrorHandler from '../error/castErrorHandler';
import DuplicateErrorHandler from '../error/duplicateErrorHandler';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal server error';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err?.name === 'ValidationError') {
    const simplifiedError = ValidationErrorHandler(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = CastErrorHandler(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = DuplicateErrorHandler(err);
    statusCode = simplifiedError?.statusCode || 400;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode || 500;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : undefined, // Hide stack in production
  });

  // Make sure to return void
  return;
};

export default globalErrorHandler;

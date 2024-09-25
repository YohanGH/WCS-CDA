import { Request, Response, NextFunction } from "express";

// AppError class with proper TypeScript types
class AppError extends Error {
  status: number;
  isOperational: boolean;
  errorType?: string;
  additionalInfo?: string;

  constructor(
    message: string,
    status: number,
    errorType?: string,
    additionalInfo?: string,
    isOperational: boolean = true
  ) {
    super(message); // Call the Error constructor
    Object.setPrototypeOf(this, new.target.prototype); // Fix inheritance for built-in Error class

    this.status = status;
    this.isOperational = isOperational;
    this.errorType = errorType;
    this.additionalInfo = additionalInfo;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const errorType = err.errorType || "Error";
  const additionalInfo = err.additionalInfo || null;
  res.status(status).json({ status, message, errorType, additionalInfo });
};

export { AppError };
export default errorHandler;

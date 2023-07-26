export class ApiError extends Error {
  statusCode: number;
  message: string;
  isOperational: boolean;
  stack: string | undefined;

  constructor(statusCode: number, message: string, isOperational: boolean = true, stack: string | undefined = '') {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;


    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this);

    }
  }
}
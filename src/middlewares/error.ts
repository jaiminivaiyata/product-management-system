import httpStatus from "http-status";
import mongoose from "mongoose";
import { config } from "../general-resources/config";
import express from "express";
import { sendCommonResponse } from "../general-components/response";
import { ApiError } from "../utils/ApiError";

export const errorConverter = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode ? error.statusCode : (error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR);

        const message = error.message ? error.message : httpStatus[`${statusCode}`];

        error = new ApiError(statusCode, message, false, err.stack);

    }
    next(error);
};


// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let statusCode: number = err.statusCode;
    let message: string = err.message
    if (config.env === "production") {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = message;

    const responseObject = {
        code: statusCode,
        message: message
    };

    sendCommonResponse(res, statusCode, responseObject);
};

export const pathNotFoundHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const responseObject = {
        code: httpStatus.NOT_FOUND,
        message: httpStatus[httpStatus.NOT_FOUND]
    };

    sendCommonResponse(res, httpStatus.NOT_FOUND, responseObject);
};

import Joi from 'joi';
import express from "express";
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';

import { sendCommonResponse } from "../general-components/response";
import { pick } from '../general-components/common-functions';


export const validate = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body', "fields", "files"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

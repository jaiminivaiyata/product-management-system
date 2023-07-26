import express from "express";

interface Iresponse {
    code?: number,
    data?: Record<string, any>,
    message?: string
}
export const sendCommonResponse = (res: express.Response, statusCode: number, responsePayload?: Iresponse) => {
    const responseObject: Iresponse = {}

    responsePayload && responsePayload.code ? responseObject.code = responsePayload.code : 1;
    responsePayload && responsePayload.data ? responseObject.data = responsePayload.data : 1;
    responsePayload && responsePayload.message ? responseObject.message = responsePayload.message : 1;

    res.status(statusCode).send(responseObject);
};

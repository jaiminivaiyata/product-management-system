import httpStatus from 'http-status';
import express from 'express';
import { ApiError } from '../utils/ApiError';

import { Product, Iprouduct } from '../models/product.model';
import { createProductService, createBulkProductService, queryProducts, getProductById, updateProductById, deleteProductById } from "../services/product.service";
import { sendCommonResponse } from "../general-components/response";

export const createProductController = async (request: express.Request, response: express.Response) => {
    const product = await createProductService({ ...request.body });

    const responseObject = {
        code: httpStatus.CREATED,
        data: product,
        message: "New Product created successfully!"
    }
    sendCommonResponse(response, httpStatus.CREATED, responseObject)
};

export const createBulkProductController = async (request: express.Request, response: express.Response) => {
    const products: Iprouduct[] = await createBulkProductService(request.body.products);
    const responseObject = {
        code: httpStatus.CREATED,
        data: products,
        message: "New Products created successfully!"
    }
    sendCommonResponse(response, httpStatus.CREATED, responseObject)
};

export const updateProductController = async (request: express.Request, response: express.Response) => {
    const product = await updateProductById(request.params.productId, request.body);

    const responseObject = {
        code: httpStatus.OK,
        data: product,
        message: "Product updated successfully!"
    }
    sendCommonResponse(response, httpStatus.OK, responseObject)
};

export const deleteProductController = async (request: express.Request, response: express.Response) => {
    await deleteProductById(request.params.productId);
    sendCommonResponse(response, httpStatus.NO_CONTENT)
};

export const getProductController = async (request: express.Request, response: express.Response) => {
    const product = await getProductById(request.params.productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    const responseObject = {
        code: httpStatus.OK,
        data: product,
        message: ""
    }
    sendCommonResponse(response, httpStatus.OK, responseObject)
};

export const getProductsController = async (request: express.Request, response: express.Response) => {
    const result = await queryProducts({ ...request.query });
    const responseObject = {
        code: httpStatus.OK,
        data: result,
        message: ""
    }
    sendCommonResponse(response, httpStatus.OK, responseObject)
};
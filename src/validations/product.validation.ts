import Joi from 'joi';
import { objectId } from './custom.validation';

export const createProduct = {
  body: Joi.object().keys({
    productName: Joi.string().max(100).required(),
    productDescription: Joi.string().max(500).required(),
    price: Joi.number().required(),
    category: Joi.string().max(50).required(),
    stockQuantity: Joi.number().integer().required(),
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
        productName: Joi.string().max(100),
        productDescription: Joi.string().max(500),
        price: Joi.number(),
        category: Joi.string().max(50),
        stockQuantity: Joi.number().integer(),
    })
    .min(1),
};

export const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};

export const getProducts = {
  query: Joi.object().keys({
    productName: Joi.string().max(100),
    productDescription: Joi.string().max(500),
    price: Joi.number(),
    category: Joi.string().max(50),
    stockQuantity: Joi.number().integer(),
  }),
};

export const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId).required(),
  }),
};
import httpStatus from 'http-status';
import { Product, Iprouduct } from '../models/product.model';
import {ApiError} from '../utils/ApiError';

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */

export const createProductService = async (productBody: Iprouduct): Promise<Iprouduct> => {
    return Product.create(productBody);
};


export const queryProducts = async (filter: Record<string, any>): Promise<Iprouduct[]> => {
    return Product.find(filter)
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
export const getProductById = async (id: string): Promise<Iprouduct> => {
    return Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
export const updateProductById = async (productId: string, updateBody: Record<string, any>): Promise<Iprouduct> => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    Object.assign(product, updateBody);
    await product.save();
    return product;
};

/**
 * Delete product by id
 * @returns {Promise<Product>}
 */
export const deleteProductById = async (productId: string) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.deleteOne();
    return product;
};

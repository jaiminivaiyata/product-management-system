import express from "express";

import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../../validations/product.validation";
import { validate } from "../../middlewares/validate";
import { createProductController, getProductsController, getProductController, updateProductController, deleteProductController } from "../../controllers/product.controller"
import { asyncHandler } from "../../middlewares/asyncHandler";


export default (router: express.Router) => {
    router.route('/product')
        .post(validate(createProduct), asyncHandler(createProductController))
        .get(validate(getProducts), asyncHandler(getProductsController));

    router
        .route('/product/:productId')
        .get(validate(getProduct), asyncHandler(getProductController))
        .patch(validate(updateProduct), asyncHandler(updateProductController))
        .delete(validate(deleteProduct), asyncHandler(deleteProductController));

}
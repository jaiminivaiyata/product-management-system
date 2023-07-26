import express from 'express';

import productRoutes from "./product.route";

const router = express.Router();


export default (): express.Router => {
  productRoutes(router)
  return router;
}
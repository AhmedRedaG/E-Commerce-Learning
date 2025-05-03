import Router from "express";

import * as productController from "../controllers/product.js";

const router = Router();

router.get("/products", productController.getProducts);

export default router;

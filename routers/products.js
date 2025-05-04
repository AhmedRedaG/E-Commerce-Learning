import Router from "express";

import * as productController from "../controllers/product.js";

const router = Router();

router.get("/", productController.getProducts);

router.get("/:productId", productController.getProductById);

export default router;

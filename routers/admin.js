import Router from "express";

import * as productController from "../controllers/product.js";

const router = Router();

router.get("/add-product", productController.getAddProduct);

router.post("/add-product", productController.postAddProduct);

router.get("/edit-product/:productId", productController.getEditProduct);

router.post("/edit-product/:productId", productController.postEditProduct);

router.post("/delete-product", productController.postDeleteProduct);

router.get("/products", productController.getAdminProducts);

export default router;

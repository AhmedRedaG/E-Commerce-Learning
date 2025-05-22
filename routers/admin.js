import Router from "express";

import * as productController from "../controllers/product.js";
import isAdminAuth from "../middlewares/adminAuth.js";
import {
  validateTitle,
  validatePrice,
  validateDescription,
} from "../middlewares/validateData.js";

const router = Router();

router.get("/add-product", isAdminAuth, productController.getAddProduct);

router.post(
  "/add-product",
  [validateTitle, validatePrice, validateDescription],
  isAdminAuth,
  productController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  isAdminAuth,
  productController.getEditProduct
);

router.post(
  "/edit-product/:productId",
  [validateTitle, validatePrice, validateDescription],
  isAdminAuth,
  productController.postEditProduct
);

router.post(
  "/delete-product",
  isAdminAuth,
  productController.postDeleteProduct
);

router.get("/products", isAdminAuth, productController.getAdminProducts);

export default router;

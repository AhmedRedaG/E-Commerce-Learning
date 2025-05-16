import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import adminRoutes from "./routers/admin.js";
import productsRoutes from "./routers/products.js";
import rootRoutes from "./routers/root.js";
import errorRoutes from "./routers/error.js";
import cartRoutes from "./routers/cart.js";
import checkoutRoutes from "./routers/checkout.js";

import path from "./util/pathResolver.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path("public")));

app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use(checkoutRoutes);
app.use(rootRoutes);
app.use(errorRoutes);

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("database connected and server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

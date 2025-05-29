import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import csrf from "csurf";
import flash from "connect-flash";
import multer from "multer";

import adminRoutes from "./routers/admin.js";
import productsRoutes from "./routers/products.js";
import cartRoutes from "./routers/cart.js";
import ordersRoutes from "./routers/orders.js";
import authRoutes from "./routers/auth.js";

import { get404, get500 } from "./controllers/error.js";

import User from "./models/userModel.js";

import path from "./util/pathResolver.js";

dotenv.config();

const MongoDBStore = connectMongoDbSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(null, false);
};

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(multer({ storage, fileFilter }).single("productImage"));
app.use(express.static(path("public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrf());
app.use(flash());

app.use((req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.user ? true : false;
  res.locals.role = req.user ? req.user.role : "";
  next();
});

app.use("/admin", adminRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.render("root", {
    pageTitle: "Our Shop",
    currentPath: "/",
  });
});

app.use(get404);
app.use(get500);

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

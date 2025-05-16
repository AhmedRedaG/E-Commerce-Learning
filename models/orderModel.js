import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
});

const Order = model("Order", orderSchema);

export default Order;

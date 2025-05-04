import Product from "./productModel.js";

class Cart {
  static items = new Map();
  static total = 0;

  static fetchAll() {
    return [...this.items.values()];
  }

  static addItem(productId) {
    Product.findById(productId, (product) => {
      Cart.items.set(productId, {
        count:
          (Cart.items.get(productId) ? Cart.items.get(productId).count : 0) + 1,
        ...product,
      });
      Cart.total += Number(product.price);
    });
  }

  static increaseItem(productId) {
    const item = this.items.get(productId);
    if (item) {
      item.count += 1;
      this.total += Number(item.price);
    }
  }

  static decreaseItem(productId) {
    const item = this.items.get(productId);
    if (item) {
      item.count -= 1;
      this.total -= Number(item.price);
      if (item.count <= 0) {
        this.items.delete(productId);
      }
    }
  }

  static removeItem(productId) {
    const item = this.items.get(productId);
    if (item) {
      this.total -= Number(item.price) * item.count;
      this.items.delete(productId);
    }
  }

  static clear() {
    this.items = new Map();
    this.total = 0;
  }

  static getTotalPrice() {
    return this.total;
  }
}

export default Cart;

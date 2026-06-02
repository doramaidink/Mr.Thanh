const Cart = require("../models/cart");
const Drink = require("../models/drinkInformation");

class CartController {
  // thêm vào giỏ hàng
  async addCart(req, res) {
    try {
      const { drinkId } = req.body;

      const drink = await Drink.findById(drinkId);

      if (!drink) {
        return res.status(404).json({
          message: "Không tìm thấy sản phẩm",
        });
      }

      const existed = await Cart.findOne({
        drinkId,
      });

      if (existed) {
        existed.quantity += 1;
        await existed.save();

        return res.status(200).json({
          message: "Tăng số lượng thành công",
          cart: existed,
        });
      }

      const cart = await Cart.create({
        drinkId: drink._id,
        nameDrink: drink.nameDrink,
        image: drink.image,
        money: drink.money,
      });

      return res.status(201).json({
        message: "Thêm giỏ hàng thành công",
        cart,
      });
    } catch (error) {
      console.error("ADD CART ERROR:", error);

      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }

  // lấy toàn bộ giỏ hàng
  async getCart(req, res) {
    try {
      const carts = await Cart.find();

      return res.status(200).json(carts);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }

  // xóa 1 món
  async deleteCart(req, res) {
    try {
      await Cart.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        message: "Xóa thành công",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }

  // tăng số lượng
  async increase(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);

      cart.quantity += 1;

      await cart.save();

      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }

  // giảm số lượng
  async decrease(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);

      if (cart.quantity > 1) {
        cart.quantity -= 1;
        await cart.save();
      }

      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Lỗi server",
      });
    }
  }
}

module.exports = new CartController();
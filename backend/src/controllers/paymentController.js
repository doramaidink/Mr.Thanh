const Cart = require("../models/cart");
const { createPayment } = require("../services/payosService");

class PaymentController {
    async createQR(req, res) {
        try {
            // 1. lấy cart
            const carts = await Cart.find();

            if (!carts.length) {
                return res.status(400).json({
                    message: "Giỏ hàng trống",
                });
            }

            // 2. tính tổng tiền
            const totalMoney = carts.reduce((sum, item) => {
                return (
                    sum +
                    Number(
                        item.money
                            .replace(/\./g, "")
                            .replace(/,/g, "")
                    ) *
                    item.quantity
                );
            }, 0);

            // 3. tạo order
            const orderCode = Date.now();

            // 4. payload gửi sang payos
            const paymentData = {
                orderCode,
                amount: totalMoney,
                description: `DH${orderCode}`,
                returnUrl: "https://mr-thanh.vercel.app/success",
                cancelUrl: "https://mr-thanh.vercel.app/cancel",
            };

            // 5. gọi service tạo QR
            const result = await createPayment(paymentData);

            console.log(JSON.stringify(result, null, 2));

            // 6. trả về frontend
            return res.status(200).json({
                qrCode: result.data.qrCode,
                checkoutUrl: result.data.checkoutUrl,
                amount: totalMoney,
                orderCode,
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Lỗi tạo QR",
                error: error.message,
            });
        }
    }
}

module.exports = new PaymentController();
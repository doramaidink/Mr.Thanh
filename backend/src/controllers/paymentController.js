const Cart = require("../models/cart");
const { createPayment } = require("../services/payosService");

class PaymentController {
    async createQR(req, res) {
        const paymentData = req.body;
        const result = await createPayment(paymentData);

        console.log(
            JSON.stringify(result, null, 2)
        );

        return res.json(result);
        try {
            const carts = await Cart.find();

            if (!carts.length) {
                return res.status(400).json({
                    message: "Giỏ hàng trống",
                });
            }

            const totalMoney = carts.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.money
                            .replace(/\./g, "")
                            .replace(/,/g, "")
                    ) *
                    item.quantity,
                0
            );

            const orderCode = Date.now();

            const paymentData = {
                orderCode,
                amount: totalMoney,
                description: `DH${orderCode}`,
                returnUrl: "http://localhost:3000/success",
                cancelUrl: "http://localhost:3000/cancel",
            };

            const result = await createPayment(paymentData);

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
            });
        }
    }
}

module.exports = new PaymentController();
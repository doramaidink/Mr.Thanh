import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
const Header = ({ cartCount }) => {
  const [openCart, setOpenCart] = useState(false);
  const [carts, setCarts] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const qrCode = paymentData?.qrCode || "";
  const amount = paymentData?.amount ?? 0;
  const orderCode = paymentData?.orderCode || "";
  //gọi API giỏ hàng
  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const res = await axios.get(
        "https://mr-thanh.onrender.com/cart"
      );

      setCarts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //xóa giỏ hàng
  const deleteCart = async (id) => {
    try {
      await axios.delete(
        `https://mr-thanh.onrender.com/cart/${id}`
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  //tăng số lượng
  const increaseQuantity = async (id) => {
    try {
      await axios.patch(
        `https://mr-thanh.onrender.com/cart/increase/${id}`
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  // giảm số lượng
  const decreaseQuantity = async (id) => {
    try {
      await axios.patch(
        `https://mr-thanh.onrender.com/cart/decrease/${id}`
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  //tính tổng tiền
  const totalPrice = carts.reduce(
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
  //API tạo QR code thanh toán
  const handleCheckout = async () => {
    try {
      console.log("CLICK THANH TOAN");

      const res = await axios.post(
        "https://mr-thanh.onrender.com/pay/thanhtoanqr"
      );

      console.log("PAYMENT RESPONSE:", res.data);

      setPaymentData(res.data);
      setShowQR(true);

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="HeaderHome">
        <div className="HeaderHomecontainer">
          <label htmlFor="menu">
            <input
              type="checkbox"
              id="menu"
              className="input-Menu"
            />

            <div className="toggle-menu">
              <span className="top_line common"></span>
              <span className="middlen_line common"></span>
              <span className="bottom_line common"></span>
            </div>

            <div className="listMenu">
              <h1>Menu</h1>

              <ul>
                <li><a href="/">Trang chủ</a></li>
                <li><a href="/tatca">Tất cả</a></li>
                <li><a href="/caphe">Cà Phê</a></li>
                <li><a href="/daxay">Đá Xay</a></li>
                <li><a href="/tra">Trà</a></li>
                <li><a href="/nuocep">Nước ép</a></li>
                <li><a href="/nuocngot">Nước ngọt</a></li>
              </ul>
            </div>
          </label>

          <div className="shopping-wrapper">
            <img
              className="shopping"
              src="/img/shopping-cart.png"
              alt=""
              onClick={() => {
                getCart();
                setOpenCart(true);
              }}
            />

            <span className="cart-count">
              {cartCount}
            </span>

            <h2>Mr.Thanh</h2>
          </div>
        </div>
      </div>

      {openCart && (
        <div className="cart-modal">
          <div className="cart-box">
            <button
              onClick={() => setOpenCart(false)}
              className="btnheader-close"
            >
              X
            </button>

            <h2>Giỏ hàng</h2>

            {carts.map((item) => (
              <div
                key={item._id}
                className="cart-item"
              >
                <img
                  src={item.image}
                  alt=""
                  width="70"
                />

                <div className="cart-info">
                  <h4>{item.nameDrink}</h4>

                  <p>{item.money} VNĐ</p>

                  <div className="quantity-box">
                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item._id)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCart(item._id)
                  }
                >
                  Xóa
                </button>
              </div>
            ))}
            <div className="cart-footer">
              <h3>
                Tổng tiền:
                {totalPrice.toLocaleString("vi-VN")} VNĐ
              </h3>
              <button className="checkout-btn"
                onClick={handleCheckout}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>

      )}
      {showQR && paymentData && (
        <div className="payment-modal">
          <div className="payment-box">

            <button
              className="close-btn"
              onClick={() => setShowQR(false)}
            >
              ✕
            </button>

            <div className="payment-content">

              {/* Bên trái */}

              <div className="payment-left">

                <QRCodeCanvas
                  className="qr-code"
                  value={paymentData.qrCode}
                  size={260}
                />

              </div>

              {/* Bên phải */}

              <div className="payment-right">

                <h3>Thông tin chuyển khoản</h3>

                <div className="info-row">
                  <span>Ngân hàng:</span>
                  <strong>MB BANK</strong>
                </div>

                <div className="info-row">
                  <span>Chủ tài khoản:</span>
                  <strong>
                    MAI LE TUAN KIET
                  </strong>
                </div>

                <div className="info-row">
                  <span>Số tài khoản:</span>
                  <strong>
                    VQROJALBQ5104
                  </strong>
                </div>

                <div className="info-row">
                  <span>Số tiền:</span>

                  <strong>
                    {amount.toLocaleString("vi-VN")} VNĐ
                  </strong>
                </div>

                <div className="info-row">
                  <span>Nội dung:</span>

                  <strong>
                    DH{paymentData.orderCode}
                  </strong>
                </div>

                <div className="payment-note">
                  Vui lòng chuyển khoản đúng số
                  tiền và nội dung để hệ thống
                  tự động xác nhận.
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
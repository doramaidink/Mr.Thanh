import React from 'react';
import Atropos from 'atropos/react';
import axios from "axios";
import { toast } from "react-toastify";
const Tatca = ({ data, refreshCart }) => {
  const { drinkInfo = [] } = data || {};
  //Hàm xử lý thêm vào giỏ hàng
  const addToCart = async (drinkId) => {
    try {
      const res = await axios.post(
        "https://mr-thanh.onrender.com/cart/add",
        { drinkId }
      );
     
      toast.success(
        "🛒 Đã thêm vào giỏ hàng thành công!"
      );
       refreshCart();
    } catch (error) {
      toast.error(
        "❌ Thêm vào giỏ hàng thất bại!"
      );
    }
  };

  return (
    <div className="content">
      {drinkInfo.map((item) => (
        <div
          className="drink-card-wrapper"
          key={item._id || item.nameDrink}
        >
          <Atropos className="drink-card">
            <img
              src={item.image}
              alt={item.nameDrink}
              className="drink-image"
              data-atropos-offset="-10"
            />

            <div
              className="drink-overlay"
              data-atropos-offset="20"
            >
              <h2 data-atropos-offset="30">
                {item.nameDrink}
              </h2>

              <i data-atropos-offset="25">
                {item.review}
              </i>

              <p
                className="price"
                data-atropos-offset="35"
              >
                {item.money} VNĐ
              </p>
            </div>
          </Atropos>

          <button
            className="cart-btn"
            onClick={() => addToCart(item._id)}
          >
            <img
              src="/img/addshopping.png"
              alt="Giỏ hàng"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tatca;
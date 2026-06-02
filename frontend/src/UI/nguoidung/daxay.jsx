import React from 'react';
import Atropos from 'atropos/react';
import axios from "axios";

const DaXay = ({ data, refreshCart }) => {
  const { drinkDaXay = [] } = data || {};
  //Hàm xử lý thêm vào giỏ hàng
  const addToCart = async (drinkId) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/cart/add",
        { drinkId }
      );

      refreshCart();

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="content">
      {drinkDaXay.map((item) => (
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

export default DaXay;
import React, { useEffect, useState } from "react";
import Header from "../../UI/nguoidung/Header";
import Trangchu from "../../UI/nguoidung/trangchu";
import axios from "axios";
const HomePage = () => {
  // thêm giỏ hàng
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    getCart();
  }, []);
  //thêm giỏ hàng 
  const getCart = async () => {
    const res = await axios.get("http://localhost:5000/cart");

    const total = res.data.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(total);
  };
  return (
    <div className="page-root min-h-screen w-full relative bg-white">
      {/* Cool Blue Glow Right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
        radial-gradient(
          circle at top right,
          rgba(70, 130, 180, 0.5),
          transparent 70%
        )
      `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container relative z-5">
        <Header cartCount={cartCount} refreshCart={getCart} />
        <Trangchu />
      </div>
    </div>




  )
}

export default HomePage
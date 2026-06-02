import React, {useEffect, useState} from "react";
import Header from "../../UI/nguoidung/Header";
import Tatca from "../../UI/nguoidung/tatca";
import axios from "axios";
const TatcaPage = () => {
     const [data,setData] = useState({
     drinkInfo:[],
  });
  // thêm giỏ hàng
  const [cartCount, setCartCount] = useState(0);
  useEffect(()=>{
    addDrinkInfo();
    getCart();
  },[]);
  const addDrinkInfo = async()=>{
    try{
      const res = await axios.get("https://mr-thanh.onrender.com/");
      setData(res.data);
      console.log(res.data);
    }
    catch(error){
      console.log("Lỗi khi lấy dữ liệu:", error);
    }
  }
  //thêm giỏ hàng 
   const getCart = async () => {
    const res = await axios.get("https://mr-thanh.onrender.com/cart");

    const total = res.data.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(total);
  };
  return   (
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
      <Header  cartCount={cartCount} refreshCart={getCart} />    
       <Tatca data={data} refreshCart={getCart}/>
      </div>
</div>

  )
}

export default TatcaPage
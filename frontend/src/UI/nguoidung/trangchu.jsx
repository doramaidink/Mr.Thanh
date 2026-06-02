import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router";
import Atropos from 'atropos/react';
const Trangchu = () => {
  const navigate = useNavigate();
  const slides = [
    {
      image: "/img/Gioithieu/all.png",
      title: "Chào Mừng Bạn đến Với Mr.Thanh",
    },
    {
      image: "/img/Gioithieu/chieutoi.png",
      title: "Chào Mừng Bạn đến Với Mr.Thanh",
    },
    {
      image: "/img/Gioithieu/hcuoi.png",
      title: "Chào Mừng Bạn đến Với Mr.Thanh",
    },
    {
      image: "/img/Gioithieu/sang.png",
      title: "Chào Mừng Bạn đến Với Mr.Thanh",
    },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let timeout = null;

    const handleWheel = (e) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        if (e.deltaY > 0) {
          setCurrent((prev) => (prev + 1) % slides.length);
        } else {
          setCurrent((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
          );
        }
      }, 100);
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const slide = slides[current];
  return (
    <div className="trangchu">
      <div className="contentTrangChu">
        <div className="hero-container">

          <Atropos className="card-trangchu">
            <img
              src={slide.image}
              alt="ảnh sản phẩm"
              data-atropos-offset="-8"
            />

            <div className="contentlayout">
              <h1 data-atropos-offset="30">
                {slide.title}
              </h1>
            </div>
          </Atropos>

          <button
            onClick={() => navigate("/tatca")}
            className="btn-start"
          >
            Start Order
          </button>

        </div>
      </div>
      <div className="gioithieu">
        <h1>Giới thiệu về Mr.Thanh</h1>
        <p>Mr.Thanh là một thương hiệu cà phê nổi tiếng tại Việt Nam, được thành lập vào năm 2005. Với hơn 15 năm kinh nghiệm trong ngành cà phê, Mr.Thanh đã trở thành một trong những thương hiệu được yêu thích nhất tại Việt Nam.</p>
        <p>Mr.Thanh cung cấp các loại cà phê chất lượng cao, được rang xay từ những hạt cà phê tốt nhất. Thương hiệu này nổi tiếng với các loại cà phê truyền thống như cà phê sữa đá, cà phê đen đá và cà phê trứng. Ngoài ra, Mr.Thanh cũng cung cấp các loại đồ uống khác như trà sữa, nước ép trái cây và bánh ngọt.</p>
      </div>
    </div>
  )
}
export default Trangchu;
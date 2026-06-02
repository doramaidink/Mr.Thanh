import { useEffect } from "react";

export default function PaymentSuccess() {
  useEffect(() => {
    alert(
      "Thanh toán thành công"
    );
  }, []);

  return (
    <div>
      <h1>
        Thanh toán thành công
      </h1>
    </div>
  );
}
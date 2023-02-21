import { useEffect, useRef } from "react";

export const SuccessHints = ({ base, message, condition = base !== null }) => {
  const ref = useRef();
  useEffect(() => {
    let timerId;
    if (condition) {
      ref.current.classList.add("active");
      console.log("success");
      timerId = setTimeout(() => {
        ref.current.classList.remove("active");
        console.log("class active removed");
      }, 5000);
    }
    return () => clearTimeout(timerId);
  }, [base, condition]);
  return (
    <div ref={ref} className="hints-success">
      <div className="success">{message}</div>
    </div>
  );
};

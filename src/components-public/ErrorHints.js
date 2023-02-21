import { useEffect, useRef } from "react";

export const ErrorHints = ({ errors }) => {
  const hintsErrorRef = useRef();

  useEffect(() => {
    let timerId;
    if (errors.length) {
      hintsErrorRef.current.classList.add("active");
      timerId = setTimeout(() => {
        hintsErrorRef.current.classList.remove("active");
      }, 5000);
    }
    return () => clearTimeout(timerId);
  }, [errors]);
  return (
    <div ref={hintsErrorRef} className={`hints-error`}>
      {errors.map((error, index) => (
        <div key={index} className="error">
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

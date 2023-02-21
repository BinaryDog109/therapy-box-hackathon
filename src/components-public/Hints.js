import { useEffect, useRef } from "react";

export const Hints = ({ hints, isSuccessHints=false }) => {
  const hintsRef = useRef();

  useEffect(() => {
    let timerId;
    if (hints.length) {
      hintsRef.current.classList.add("active");
      timerId = setTimeout(() => {
        hintsRef.current.classList.remove("active");
      }, 5000);
    }
    return () => clearTimeout(timerId);
  }, [hints]);
  return (
    <div ref={hintsRef} className={`${isSuccessHints?'hints-success' :'hints-error'} `}>
      {hints.map((error, index) => (
        <div key={index}>
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
};

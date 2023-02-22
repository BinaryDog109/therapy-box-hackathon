import { useEffect, useRef } from "react";
/**
 * A global component that helps display success/error messages
 * @param {object} props 
 * @param {Array<string>} props.hints - An array of messages to be displayed
 * @param {Boolean} props.isSuccessHints - True for green color, false for red
 */
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

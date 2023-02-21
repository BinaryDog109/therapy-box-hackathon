import styles from "./ClothesPieCharts.module.css";
import { pie, arc } from "d3";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const charColors = [
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
];
export const ClothesPieChart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const tooltipRef = useRef();

  useEffect(() => {
    let isCancelled = false;
    const getData = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      if (!isCancelled) setData(json);
    };
    try {
      getData("/assets/clothing-api.json");
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const processData = (payload) => {
    const map = new Map();
    for (let elem of payload) {
      const key = elem.clothe;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map.entries();
  };
  const handleMouseMove = (event, arcData, index) => {
    const x = event.pageX;
    const y = event.pageY;
    const tooltip = tooltipRef.current;
    tooltip.style.display = "block";
    tooltip.innerText = `${arcData.data[0]} - ${(
      (arcData.data[1] / 1000) *
      100
    ).toFixed(2)}%`;
    tooltip.style.left = `${x + 5}px`;
    tooltip.style.top = `${y + 5}px`;
  };
  const entries = data ? processData(data.payload) : [];
  const pieData = pie().value((d) => d[1])(entries);
  const pieRadius = 50;
  const pieArc = arc().innerRadius(0).outerRadius(pieRadius);
  return (
    data && (
      <>
        <div className={styles["container"]}>
          {createPortal(
            <div
              style={{
                position: "absolute",
                backgroundColor: "antiquewhite",
                padding: ".2em",
                zIndex: "2",
                color: "gray",
              }}
              ref={tooltipRef}
            ></div>,
            document.body
          )}
          <svg viewBox="0 0 100 100">
            <g transform={`translate(${pieRadius},${pieRadius})`}>
              {pieData.map((arcData, index) => (
                <path
                  onMouseMove={(event) =>
                    handleMouseMove(event, arcData, index)
                  }
                  onMouseLeave={() =>
                    (tooltipRef.current.style.display = "none")
                  }
                  key={index}
                  fill={charColors[index]}
                  d={pieArc(arcData)}
                />
              ))}
            </g>
          </svg>
          <div className={styles["statistics"]}></div>
        </div>
      </>
    )
  );
};

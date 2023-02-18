import { useGeoWeather } from "../../../hooks/useGeo";
import styles from "./WeatherInfo.module.css";
const iconMap = {
  Clouds: "./assets/Clouds_icon.png",
  Rain: "./assets/Rain_icon.png",
  Clear: "./assets/Sun_icon.png",
};
export const WeatherInfo = () => {
  const [weatherData, error] = useGeoWeather();
  const temperature = weatherData ? weatherData.main.temp : "";
  const location = weatherData ? weatherData.name : "";
  const weatherType = weatherData ? weatherData.weather[0].main : "";
  if (error) console.error(error);
  return (
    <div className={styles["container"]}>
      {!weatherData ? (
        <span>Loading...</span>
      ) : (
        <>
          <div className={styles["icon"]}>
            {iconMap[weatherType] ? (
              <img src={iconMap[weatherType]} alt="weather icon" />
            ) : (
              ""
            )}
          </div>
          <div className={styles["celsius"]}>
            {temperature}
            <br></br>
            <span>degrees</span>
          </div>
          <div className={styles["location"]}>{location}</div>
        </>
      )}
    </div>
  );
};

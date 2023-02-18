import { useGeoWeather } from "../../hooks/useGeo";
import { DashboardItem } from "./components/DashboardItem";
import { WeatherInfo } from "./components/WeatherInfo";
import styles from "./DashboardPage.module.css";
export const DashboardPage = ({ name = "" }) => {
  return (
    <>
      <h2>Good day {name}</h2>
      <div className={styles["container"]}>
        <DashboardItem title={"Weather"}>
            <WeatherInfo/>
        </DashboardItem>
        <DashboardItem title="News" />
        <DashboardItem title="Sports" />
        <DashboardItem title="Photos" />
        <DashboardItem title="Tasks" />
        <DashboardItem title="Clothes" />
      </div>
    </>
  );
};

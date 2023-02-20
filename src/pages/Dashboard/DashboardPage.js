import { Route, Switch } from "react-router-dom";
import { useRSS } from "../../hooks/useRSS";
import { SportsPage } from "../Sports/SportsPage";
import { ClothesPieChart } from "./components/ClothesPieChart";
import { DashboardItem } from "./components/DashboardItem";
import { NewsInfo } from "./components/NewsInfo";
import { TasksInfo } from "./components/TasksInfo";
import { WeatherInfo } from "./components/WeatherInfo";
import styles from "./DashboardPage.module.css";

export const DashboardPage = ({ name = "" }) => {
  return (
    <>
      <h2>Good day {name}</h2>
      <div className={styles["container"]}>
        <DashboardItem disableClick title={"Weather"}>
          <WeatherInfo />
        </DashboardItem>
        <DashboardItem title="News" path="/news">
          <NewsInfo />
        </DashboardItem>
        <DashboardItem title="Sports" path="/sports" />
        <DashboardItem title="Photos" path="/photos" />
        <DashboardItem title="Tasks" path="/tasks">
          <TasksInfo />
        </DashboardItem>
        <DashboardItem title="Clothes" disableClick>
          <ClothesPieChart />
        </DashboardItem>
      </div>
    </>
  );
};

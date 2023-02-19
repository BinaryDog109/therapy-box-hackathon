import { Route, Switch } from "react-router-dom";
import { useRSS } from "../../hooks/useRSS";
import { SportsPage } from "../Sports/SportsPage";
import { DashboardItem } from "./components/DashboardItem";
import { NewsInfo } from "./components/NewsInfo";
import { WeatherInfo } from "./components/WeatherInfo";
import styles from "./DashboardPage.module.css";

export const DashboardPage = ({ name = "" }) => {
  const [feed, error] = useRSS(
    "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml"
  );
  return (
    <>
      <h2>Good day {name}</h2>
      <div className={styles["container"]}>
        <DashboardItem disableClick title={"Weather"}>
          <WeatherInfo />
        </DashboardItem>
        <DashboardItem title="News" path="/news">
          <NewsInfo news={feed} error={error} />
        </DashboardItem>
        <DashboardItem title="Sports" path="/sports" />
        <DashboardItem title="Photos" path="/photos" />
        <DashboardItem title="Tasks" path="/tasks" />
        <DashboardItem title="Clothes" disableClick />
      </div>
    </>
  );
};

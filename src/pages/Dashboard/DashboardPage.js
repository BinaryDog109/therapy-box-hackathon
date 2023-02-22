import { useAuthContext } from "../../hooks/useAuthContext";
import { ClothesPieChart } from "./components/ClothesPieChart";
import { DashboardItem } from "./components/DashboardItem";
import { NewsInfo } from "./components/NewsInfo";
import { PhotosInfo } from "./components/PhotosInfo";
import { SportsInfo } from "./components/SportsInfo";
import { TasksInfo } from "./components/TasksInfo";
import { WeatherInfo } from "./components/WeatherInfo";
import styles from "./DashboardPage.module.css";
/**
 * @description A page component that displays the Dashboard. Needs authentication before access.
 * Its sub-components include many "thunbnail" components, every of which has different look
 */
export const DashboardPage = () => {
  const { user, authChecked } = useAuthContext();
  return (
    <>
      <div className={styles["header"]}>
        <h2>Good day {user.displayName}</h2>
        {user.photoURL ? (
          <img src={user.photoURL} alt={`Avatar of ${user.displayName}`} />
        ) : null}
      </div>

      <div className={styles["container"]}>
        <DashboardItem disableClick title={"Weather"}>
          <WeatherInfo />
        </DashboardItem>
        <DashboardItem title="News" path="/news">
          <NewsInfo />
        </DashboardItem>
        <DashboardItem title="Sports" path="/sports">
          <SportsInfo />
        </DashboardItem>
        <DashboardItem title="Photos" path="/photos">
          <PhotosInfo />
        </DashboardItem>
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

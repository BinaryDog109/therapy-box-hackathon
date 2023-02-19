import { useHistory } from "react-router-dom";
import styles from "./DashboardItem.module.css";
export const DashboardItem = ({ title = "", disableClick=false, path = "/", children }) => {
  const history=useHistory()
  return (
      <div style={{cursor: disableClick? 'initial':'pointer'}} onClick={()=>{history.push(`${path}`)}} className={styles["item"]}>
        <div className={styles["title"]}>
          <span>{title}</span>
        </div>
        {children}
      </div>
  );
};

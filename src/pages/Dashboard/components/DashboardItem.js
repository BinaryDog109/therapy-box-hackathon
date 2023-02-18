import styles from "./DashboardItem.module.css";
export const DashboardItem = ({ title = "", children }) => {
  return (
    <div className={styles["item"]}>
      <div className={styles["title"]}>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};

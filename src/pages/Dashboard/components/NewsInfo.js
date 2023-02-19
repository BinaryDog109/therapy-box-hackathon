import { useNewsContext } from "../../../hooks/useNewsContext";
import styles from "./NewsInfo.module.css";
export const NewsInfo = () => {
  const { feed, setFeed, error } = useNewsContext();

  if (error) {
    console.error(error);
    return <p>{error}</p>;
  }

  const title = feed ? feed.title : null;
  return (
    <div className={styles["container"]}>
      {feed ? (
        <>
          <span className={styles["headline"]}>{title}</span>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

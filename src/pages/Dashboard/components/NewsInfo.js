import { useNewsContext } from "../../../hooks/useNewsContext";
import styles from "./NewsInfo.module.css";
export const NewsInfo = () => {
  const { feed, setFeed, error } = useNewsContext();

  if (error) {
    console.error(error);
  }

  const title = feed ? feed.title : null;
  return (
    <div className={styles["container"]}>
      {feed && !error ? (
        <>
          <span className={styles["headline"]}>{title}</span>
        </>
      ) : (
        <span>{error? 'Error in fetching news' : 'Loading...'}</span>
      )}
    </div>
  );
};

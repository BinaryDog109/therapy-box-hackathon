import { useNewsContext } from "../../hooks/useNewsContext";
import styles from "./NewsPage.module.css";
export const NewsPage = () => {
  const { feed, setFeed, error } = useNewsContext();
  console.log(feed);
  return (
    <>
      <h2 className={`left-position`} style={{ position: "absolute" }}>
        News
      </h2>
      <div className={styles["container"]}>
        <div className={styles["image-container"]}>
          <a href={feed.link}>
            <img
              width={"100%"}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a2/BBC_News_2022_%28Alt%29.svg"
              alt="News"
            />
          </a>
        </div>
        <h3 className={styles["headline"]}>{feed.title}</h3>
        <p className={styles["article"]}>{feed.content}</p>
      </div>
    </>
  );
};

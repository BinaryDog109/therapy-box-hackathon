import styles from "./NewsInfo.module.css";
export const NewsInfo = ({news,error}) => {
  if (error) {
    console.error(error);
    return <p>{error}</p>;
  }
  
  const title = news ? news.title : null;
  return (
    <div className={styles["container"]}>
      {news ? (
        <>
          <span className={styles["headline"]}>{title}</span>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

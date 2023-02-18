import styles from "./NewsPage.module.css";
export const NewsPage = () => {
  return (
    <>
      <h2 className={`left-position`} style={{position: 'absolute'}}>News</h2>
      <div className={styles["container"]}>
        <div className={styles["image-container"]}>
          <img src="" alt="News" />
        </div>
        <h3 className={styles['headline']}>News Headline</h3>
        <p className={styles['article']}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro soluta
          libero tempora, animi earum perspiciatis? Ipsa, vero? Repudiandae
          veritatis consequatur dignissimos id perferendis eum, minima
          voluptatum debitis itaque ad dicta beatae voluptatibus libero eos unde
          nam vero ipsam sint aspernatur consequuntur ea recusandae! Doloribus
          unde sit reiciendis id quidem assumenda pariatur commodi ullam,
          deserunt magni enim eos quasi, dolore eveniet repellat est facere.
          Architecto, sunt quas repellendus a corrupti nesciunt eum, tempore nam
          ipsum asperiores delectus rem quasi qui aliquam, nobis accusamus!
          Quibusdam cumque maiores neque reprehenderit, voluptatum sint pariatur
          maxime, alias aut vel magnam nisi non minus magni laborum?
        </p>
      </div>
    </>
  );
};

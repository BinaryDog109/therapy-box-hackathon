import styles from "./LoginSignupPage.module.css";
export const LoginPage = () => {
  return (
    <>
    <h2>Login</h2>
    <div className={styles["container"]}>
      <div className={styles["inputs"]}>
        <div className={styles[['row']]}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
        </div>
      </div>
      <button type="submit">Login</button>
      <p className={styles["hints"]}>
        New to the Hackathon? <a href="/signup">Sign up</a>
      </p>
    </div></>
  );
};

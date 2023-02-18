import styles from "./LoginSignupPage.module.css";
export const SignupPage = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["inputs"]}>
        <div className={styles["row"]}>
          <input
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
          <input placeholder="Email" type="email" name="email" id="email" />
        </div>
        <div className={styles["row"]}>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
          />
        </div>
      </div>
      <div className={styles["upload-picture"]}>
        <label htmlFor="avatar">
            Add picture
            <input type="file" accept="image/gif, image/jpeg, image/png" id="avatar" name="avatar" />
        </label>
        
      </div>
      <button className={styles["register-button"]} type="submit">Register</button>
    </div>
  );
};

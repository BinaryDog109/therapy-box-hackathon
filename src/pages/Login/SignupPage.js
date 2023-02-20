import { useEffect, useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import styles from "./LoginSignupPage.module.css";
const initialUserInfo = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatarLink: "",
};
export const SignupPage = () => {
  const [signUp, user, error] = useSignUp();
  const [userInfo, setUserInfo] = useState({ ...initialUserInfo });
  const [arePasswordsMatch, setArePasswordsMatch] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword, avatarLink } = userInfo;
    setUserInfo((prev) => ({ ...prev, confirmPassword: "" }));
    if (password !== confirmPassword) {
      setArePasswordsMatch(false);
    } else {
      setArePasswordsMatch(true);
      setUserInfo({ ...initialUserInfo });
      signUp(email, password, username);
    }
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h2>Sign Up</h2>
      <div className={styles["hints-error"]}>
        {!arePasswordsMatch && !userInfo.confirmPassword.length && (
          <span>Password does not match!</span>
        )}
        {error && <span>{error}</span>}
      </div>
      <div className={styles["container"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["inputs"]}>
            <div className={styles["row"]}>
              <input
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                value={userInfo.username}
                onChange={handleChange}
              />
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles["row"]}>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={userInfo.password}
                onChange={handleChange}
              />
              <input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles["upload-picture"]}>
            <label htmlFor="avatar">
              Add picture
              <input
                type="file"
                accept="image/gif, image/jpeg, image/png"
                id="avatar"
                name="avatar"
              />
            </label>
          </div>
          <button className={styles["register-button"]} type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

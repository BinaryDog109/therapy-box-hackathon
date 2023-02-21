import { useEffect, useState } from "react";
import { Hints } from "../../components-public/Hints";
import { useLogin } from "../../hooks/useLogin";
import styles from "./LoginSignupPage.module.css";
export const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [login, user, error, pending] = useLogin();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, error.message]);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = userInfo;
    if (!email || !password) return;
    login(email, password);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h2>Login</h2>
      <Hints hints={errors} />
      <div className={styles["container"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["inputs"]}>
            <div className={styles[["row"]]}>
              <input
                placeholder="Email"
                type="text"
                name="email"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={userInfo.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button disabled={pending} type="submit">
            Login
          </button>
          <p className={styles["hints"]}>
            New to the Hackathon? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
};

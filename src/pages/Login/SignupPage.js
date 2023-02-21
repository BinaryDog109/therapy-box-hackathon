import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorHints } from "../../components-public/ErrorHints";
import { useSignUp } from "../../hooks/useSignUp";
import styles from "./LoginSignupPage.module.css";
const initialUserInfo = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignupPage = () => {
  const [signUp, user, error, pending] = useSignUp();
  const [userInfo, setUserInfo] = useState({ ...initialUserInfo });
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState([]);
  if (error) {
    setErrors((prev) => [...prev, error]);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = userInfo;
    if (!username || !email || !password || !confirmPassword) {
      setErrors((prev) => [...prev, "Please fill in every entry"]);
      return;
    }
    if (password !== confirmPassword) {
      setUserInfo((prev) => ({ ...prev, confirmPassword: "" }));
      setErrors((prev) => [...prev, "Passwords do not match"]);
    } else {
      setErrors([]);
      setUserInfo({ ...initialUserInfo });

      signUp(email, password, username, avatar);
      setAvatar(null);
    }
  };
  const handleAvatarSelected = (event) => {
    const file = event.target.files[0];
    if (!file || file.type.indexOf("image") === -1) {
      console.error("Please upload an image!");
      setErrors((prev) => [...prev, "Please upload an image"]);
      return;
    }
    setAvatar(file);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <h2>Sign Up</h2>
      <ErrorHints errors={errors}/>
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
                required
              />
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
                required
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
                required
              />
              <input
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Use usememo to prevent flashing on the preview */}
          {useMemo(
            () => (
              <div
                style={{
                  backgroundImage: avatar
                    ? `url(${URL.createObjectURL(avatar)})`
                    : "none",
                  backgroundSize: "contain",
                }}
                className={styles["upload-picture"]}
              >
                <label htmlFor="avatar">
                  {avatar ? "" : `Add picture`}
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    id="avatar"
                    name="avatar"
                    onChange={handleAvatarSelected}
                  />
                </label>
              </div>
            ),
            [avatar]
          )}

          <button
            style={{ cursor: pending ? "default" : "pointer" }}
            disabled={pending}
            className={styles["register-button"]}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

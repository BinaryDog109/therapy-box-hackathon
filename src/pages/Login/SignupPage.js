import { useMemo, useState } from "react";
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
  const [arePasswordsMatch, setArePasswordsMatch] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, confirmPassword } = userInfo;

    if (password !== confirmPassword) {
      setUserInfo((prev) => ({ ...prev, confirmPassword: "" }));
      setArePasswordsMatch(false);
    } else {
      setArePasswordsMatch(true);
      setUserInfo({ ...initialUserInfo });

      signUp(email, password, username, avatar);
      setAvatar(null);
    }
  };
  const handleAvatarSelected = (event) => {
    const file = event.target.files[0];
    if (!file || file.type.indexOf("image") === -1) {
      console.error("Please upload an image!");
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
                    required
                  />
                </label>
              </div>
            ),
            [avatar]
          )}

          <button
            style={{ cursor: pending ? "none" : "pointer" }}
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

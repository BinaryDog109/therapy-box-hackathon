import styles from './LoginPage.module.css'
export const LoginPage = () => {
  return (
    <div className={styles['container']}>
      <h2 className={styles['title']}>Hackathon</h2>
      <div className={styles['inputs']}>
        <input placeholder='Username' type="text" name="username" id="username" />
        <input placeholder='Password' type="password" name="password" id="password" />
      </div>
      <button type="submit">Login</button>
      <p className={styles['hints']}>
        New to the Hackathon? <a href="#">Sign up</a>
      </p>
    </div>
  );
};

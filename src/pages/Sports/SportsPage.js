import styles from './SportsPage.module.css'
export const SportsPage = () => {
  return (
    <>
        <h2 className="left-position">Sports</h2>
        <div className={styles['container']}>
            <input autoFocus placeholder="Input team name" type="text" name="search-team" id="search-team" />
            <ul className={styles['team-list']}>
                <li className={styles['list-item']}>Team1</li>
                <li className={styles['list-item']}>Team1</li>
                <li className={styles['list-item']}>Team1</li>
            </ul>
        </div>
    </>
    )
}
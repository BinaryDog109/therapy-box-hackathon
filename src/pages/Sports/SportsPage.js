import styles from "./SportsPage.module.css";
import { csv } from "d3";
import { useEffect, useState } from "react";

export const SportsPage = () => {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    const getData = async () => {
      const data = await csv("./assets/sports.csv");
      setData(data);
    };
    getData();
  }, []);

  const searchTeamsWithName = (name) => {
    if (!data || !input) return [];
    name = name.toLowerCase();
    //   Getting any matches they won, either being a home team or an away team
    const matchesWon = data.filter((row) => {
      return (
        (row["HomeTeam"].toLowerCase() === name && row["FTHG"] > row["FTAG"]) ||
        (row["AwayTeam"].toLowerCase() === name && row["FTHG"] < row["FTAG"])
      );
    });
    const beatTeams = matchesWon.map((row) => {
      return row["HomeTeam"].toLowerCase() === name
        ? { beat: row["AwayTeam"], goals: row["FTHG"], beatGoals: row["FTAG"] }
        : { beat: row["HomeTeam"], goals: row["FTAG"], beatGoals: row["FTHG"] };
    });
    return beatTeams;
  };
  const filteredData = searchTeamsWithName(input);
  const handleChange = (event) => {
    setInput(event.target.value);
  };
 
  return (
    <>
      <h2 className="left-position">Sports</h2>
      <div className={styles["container"]}>
        <input
          autoFocus
          placeholder="Input team name"
          type="text"
          name="search-team"
          id="search-team"
          onChange={handleChange}
          value={input}
        />
        <ul className={styles["team-list"]}>
          {filteredData.length > 0 && (
            <button style={{ marginTop: 0,justifySelf:'center' }} type="submit">
              Mark Favorite
            </button>
          )}
          {filteredData.map(({ beat, goals, beatGoals }, index) => (
            <li key={index} className={styles["list-item"]}>
              <span>
                Beat {beat}; Scores: {goals} : {beatGoals}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

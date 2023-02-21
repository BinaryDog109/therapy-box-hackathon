import styles from "./SportsPage.module.css";
import { csv } from "d3";
import { useEffect, useState } from "react";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useSportsContext } from "../../hooks/useSportsContext";
import { useAuthContext } from "../../hooks/useAuthContext";

export const SportsPage = () => {
  const [data, setData] = useState(null);
  const { document, error } = useSportsContext();
  const [input, setInput] = useState("");
  const { user } = useAuthContext();
  const [addOperationStatus, addDoc] = useAddDocument("Sports");
  const favTeam = document && document.favoriteTeam;
  useEffect(()=>{
    if(document){
      setInput(document.favoriteTeam)
    }
  },[document])
  useEffect(() => {
    const getData = async () => {
      const data = await csv("./assets/sports.csv");
      setData(data);
    };
    getData();
  }, []);
  useEffect(() => {
    if (addOperationStatus.success) {
      console.log("Mark success");
    }
    if (addOperationStatus.error) {
      console.error(addOperationStatus.error);
    }
  }, [addOperationStatus]);

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
  const handleMarkFavorite = () => {
    addDoc({ favoriteTeam: input }, user.uid);
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
            <button
              onClick={handleMarkFavorite}
              style={{ marginTop: 0, justifySelf: "center" }}
              type="submit"
              disabled={addOperationStatus.pending || favTeam === input}
            >
              {favTeam === input ? "This is your fav team!" : "Mark Favorite"}
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

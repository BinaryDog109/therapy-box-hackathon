import styles from "./SportsPage.module.css";
import { csv } from "d3";
import { useEffect, useState } from "react";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useSportsContext } from "../../hooks/useSportsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Hints } from "../../components-public/Hints";
/**
 * 
 * @description A page component that displays an input
 * where users can type in their favorite team's name
 * and a body listing out the other teams they beat, with scores
 * User can mark their favorite team here by clicking the "Mark favorite" button
 */
export const SportsPage = () => {
  const [data, setData] = useState(null);
  const { document, error } = useSportsContext();
  const [input, setInput] = useState("");
  const { user } = useAuthContext();
  const [addOperationStatus, addDoc] = useAddDocument("Sports");
  const [errors, setErrors] = useState([])
  const [successes, setSuccesses] = useState([])
  const favTeam = document && document.favoriteTeam;
  useEffect(()=>{
    if(error) {
      console.error(error)
      setErrors(['Errors in fetching fav team'])
    }
  },[error])
  useEffect(() => {
    if (document) {
      setInput(document.favoriteTeam || '');
    }
  }, [document]);
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
      setSuccesses(['Great, You have marked your fav team!'])
    }
    if (addOperationStatus.error) {
      console.error(addOperationStatus.error);
      setErrors(['Error in marking teams'])
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
      <Hints hints={errors} />
      <Hints hints={successes} isSuccessHints />
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
        {filteredData.length > 0 && (
          <button
            onClick={handleMarkFavorite}
            style={{
              marginTop: "1em",
              justifySelf: "center",
              cursor: favTeam === input ? "default" : "pointer",
            }}
            type="submit"
            disabled={addOperationStatus.pending || favTeam === input}
          >
            {favTeam === input ? "This is your fav team!" : "Mark Favorite"}
          </button>
        )}
        <ul className={styles["team-list"]}>
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

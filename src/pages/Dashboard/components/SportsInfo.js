import { useSportsContext } from "../../../hooks/useSportsContext";

export const SportsInfo = () => {
  const { document, error } = useSportsContext();
  if (error) {
    console.error(error);
  }
  return (
    <div
      style={{
        flexGrow: "1",
        display: "grid",
        placeItems: "center",
        fontSize: "var(--body-big-fs)",
        color: "initial",
      }}
    >
      💖 {' '}
      {document && document.favoriteTeam && !error
        ? ` ${document.favoriteTeam}`
        : error
        ? "Error fetching fav team"
        : "Choose a team"}
    </div>
  );
};

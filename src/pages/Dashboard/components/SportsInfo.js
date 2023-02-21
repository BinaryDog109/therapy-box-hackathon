import { useSportsContext } from "../../../hooks/useSportsContext";

export const SportsInfo = () => {
  const { document, error } = useSportsContext();
  if (error) {
    console.error(error);
  }
  return (
    document && (
      <div
        style={{
          flexGrow: "1",
          display: "grid",
          placeItems: "center",
          fontSize: "var(--body-big-fs)",
          color: "initial",
        }}
      >
        💖 {document.favoriteTeam || "Choose a team"}
      </div>
    )
  );
};

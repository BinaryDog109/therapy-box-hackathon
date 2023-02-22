import { createContext } from "react";
import { useRSS } from "../hooks/useRSS";
/**
 * @description A React Context and Context provider that keep track of the collected RSS feed
*/
export const NewsContext = createContext();
export const NewsContextProvider = ({ children }) => {
  const [feed, setFeed, error] = useRSS(
    "https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml"
  );
  const contextValueObject = { feed, setFeed, error };

  return (
    <NewsContext.Provider value={contextValueObject}>
      {children}
    </NewsContext.Provider>
  );
};

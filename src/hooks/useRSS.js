import { useEffect, useState } from "react";
/**
 * A hook that sets up states of RSS fetching
 * @returns {Array}
 */
export const useRSS = (url) => {
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null)
  useEffect(() => {
    let isCancelled = false;
    const getRSS = async (url) => {
      const res = await fetch(url);
      const json = await res.json();
      const items = json.items;
      // Only setting the latest one
      if (!isCancelled) setFeed(items[0]);
    };
    try {
        getRSS(url);
    } catch (error) {
        setError(error)
    }
    
    return () => {
      isCancelled = true;
    };
  }, [url]);

  return [feed, setFeed, error];
};

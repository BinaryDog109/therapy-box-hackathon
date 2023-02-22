import { useEffect, useState } from "react";
import { fireAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
/**
 * A hook that sets up the state of a logout function, exporting the logout function
 * @returns {[logout, error:string, pending:boolean, user:object]}
 */
export const useLogout = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  const logout = async () => {
    try {
      setPending(true);
      await fireAuth.signOut();
      if (!isCancelled) {
        setUser(null);
        setPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setPending(false);
      }
    }
  };
  return [logout, error, pending, user];
};

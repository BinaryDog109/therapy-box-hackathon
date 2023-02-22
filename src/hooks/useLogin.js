import { useEffect, useState } from "react";
import { fireAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
/**
 * A hook that sets up the state of a login function, exporting the login function
 * @returns {[login, user:object, error:string, pending:boolean]}
 */
export const useLogin = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  const login = async (email, password) => {
    setPending(true);
    try {
      const res = await fireAuth.signInWithEmailAndPassword(email, password);
      if (!isCancelled) {
        setUser(res.user);
        setPending(false);
      }
    } catch (error) {
      if (!isCancelled) {
        // Set the error object as state because otherwise,
        // effects in ErrorHints won't run due to identical error strings
        setError(error);
        setPending(false);
      }
    }
  };
  return [login, user, error, pending];
};

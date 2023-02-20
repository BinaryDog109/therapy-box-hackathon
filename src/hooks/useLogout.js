import { useEffect, useState } from "react";
import { fireAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(null);
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
  return [logout, error, pending];
};

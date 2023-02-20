import { useEffect, useState } from "react";
import { fireAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

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
        setPending(false)
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setPending(false)
      }
    }
  };
  return [login, user, error, pending];
};
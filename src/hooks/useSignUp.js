import { useState } from "react";
import { fireAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useSignUp = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const signUp = async (email, password, userName, imageUrl) => {
    try {
      const res = await fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await res.user.updateProfile({
        displayName: userName,
        photoURL: imageUrl || "",
      });

      setUser(res.user);
    } catch (error) {
      setError(error.message);
    }
  };
  return [signUp, user, error];
};

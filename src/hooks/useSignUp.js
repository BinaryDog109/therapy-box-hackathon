import { useEffect, useState } from "react";
import { fireAuth, fireStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
export const useSignUp = () => {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  const signUp = async (email, password, userName, avatar) => {
    try {
      const res = await fireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      let avatarUrl = "";
      if (avatar) {
        // Upload user avatar if provided
        const metadata = {
          contentType: "image/jpeg",
        };
        const ref = fireStorage
          .ref()
          .child(`avatar/${res.user.uid}/${avatar.name}`);
        await ref.put(avatar, metadata);
        avatarUrl = await ref.getDownloadURL();
      }
      await res.user.updateProfile({
        displayName: userName,
        photoURL: avatarUrl,
      });

      if (!isCancelled) {
        setUser(res.user);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return [signUp, user, error];
};

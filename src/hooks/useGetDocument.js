import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useGetDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = firestore
      .collection(collection)
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          if (!snapshot.exists) {
            setDocument({});
          } else {
            setDocument(snapshot.data());
          }
        },
        (error) => {
          setError(error.message);
        }
      );

    return () => {
      unsub();
    };
  }, [collection, id]);

  return [document, error];
};

import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (name, _orderBy) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Prevent infinite loop thanks to useRef
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    const store = orderBy
      ? firestore.collection(name).orderBy(...orderBy)
      : firestore.collection(name);
    const unsub = store.onSnapshot(
      (snapShot) => {
        if (snapShot.empty) {
          setData([]);
        } else {
          const arr = [];
          snapShot.docs.forEach((doc) => {
            arr.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          setData(arr);
        }
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unsub();
  }, [name,orderBy]);

  return [data, error];
};

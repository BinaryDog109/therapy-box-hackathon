import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";
/**
 * A hook that sets up the documents and state of a Get (group) operation
 * @param {string} name - name of a Firestore collection
 * @param {Array} _query - a Firestore query array
 * @param {Array} _orderBy - a Firestore orderBy array
 * @returns {Array} - data: retrived data as a React state; error - Error message
 */
export const useCollection = (name, _query, _orderBy) => {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // Prevent infinite loop thanks to useRef
  const orderBy = useRef(_orderBy).current;
  const query = useRef(_query).current;
  
  useEffect(() => {
    const store =
      orderBy && query
        ? firestore
            .collection(name)
            .where(...query)
            .orderBy(...orderBy)
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
  }, [name, query, orderBy]);

  return [data, error];
};

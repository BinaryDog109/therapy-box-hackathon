import { useEffect, useState } from "react";
import { firestore, timestamp } from "../firebase/config";
/**
 * A hook that sets up the document and state of a Create operation
 * @param {string} collectionName - name of a Firestore collection
 * @returns {Array} - addOperationStatus: A React state object; addDoc - The function that adds a document
 */
// Encapsulate an operation in a hook so that it becomes safer and react-ful
export const useAddDocument = (collectionName) => {
  const [addOperationStatus, setAddOperationStatus] = useState({
    success: false,
    document: null,
    error: null,
    pending: false,
  });
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  const addDoc = async (doc, id = "") => {
    setAddOperationStatus((prev) => ({
      ...prev,
      pending: true,
    }));
    const createdAt = timestamp.fromDate(new Date());
    try {
      let addedDocument = null;
      if (id) {
        addedDocument = await firestore
          .collection(collectionName)
          .doc(id)
          .set(doc, { merge: true });
      } else {
        addedDocument = await firestore
          .collection(collectionName)
          .add({ ...doc, createdAt });
      }
      if (!isCancelled) {
        setAddOperationStatus((prev) => ({
          ...prev,
          document: addedDocument,
          success: true,
          pending: false,
        }));
      }
    } catch (error) {
      setAddOperationStatus((prev) => ({
        ...prev,
        error: error.message || "Unknown Error!",
        pending: false,
      }));
    }
  };
  return [addOperationStatus, addDoc];
};

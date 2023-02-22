import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
/**
 * A hook that sets up the document and state of an Update operation
 * @param {string} collectionName - name of a Firestore collection
 * @returns {Array} - updateOperationStatus: A React state object; updateDoc - The function that updates a document
 */
// Encapsulate an operation in a hook so that it becomes safer and react-ful
export const useUpdateDocument = (collectionName) => {
  const [updateOperationStatus, setUpdateOperationStatus] = useState({
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
  const updateDoc = async (id, data) => {
    setUpdateOperationStatus((prev) => ({
      ...prev,
      pending: true,
    }));
    try {
      await firestore
        .collection(collectionName)
        .doc(id)
        .update({ ...data });

      if (!isCancelled) {
        setUpdateOperationStatus((prev) => ({
          ...prev,
          document: null,
          success: true,
          pending: false,
        }));
      }
    } catch (error) {
      setUpdateOperationStatus((prev) => ({
        ...prev,
        error: error.message || "Unknown Error!",
        pending: false,
      }));
    }
  };
  return [updateOperationStatus, updateDoc];
};

import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";
/**
 * A hook that sets up the document and state of a Delete operation
 * @param {string} collectionName - name of a Firestore collection
 * @returns {Array}
 */
// Encapsulate an operation in a hook so that it becomes safer and react-ful
export const useDeleteDocument = (collectionName) => {
  const [deleteOperationStatus, setDeleteOperationStatus] = useState({
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
  const deleteDoc = async (id) => {
    setDeleteOperationStatus((prev) => ({
      ...prev,
      pending: true,
    }));
    try {
      await firestore.collection(collectionName).doc(id).delete();

      if (!isCancelled) {
        setDeleteOperationStatus((prev) => ({
          ...prev,
          document: null,
          success: true,
          pending: false,
        }));
      }
    } catch (error) {
      setDeleteOperationStatus((prev) => ({
        ...prev,
        error: error.message || "Unknown Error!",
        pending: false,
      }));
    }
  };
  return [deleteOperationStatus, deleteDoc];
};

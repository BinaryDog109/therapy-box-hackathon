import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

// Encapsulate an operation in a hook so that it becomes safer and react-ful
export const useDeleteDocument = (collectionName) => {
  const [deleteOperationStatus, setDeleteOperationStatus] = useState({
    success: false,
    document: null,
    error: null,
  });
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);
  const deleteDoc = async (id) => {
    try {
      await firestore.collection(collectionName).doc(id).delete();

      if (!isCancelled) {
        setDeleteOperationStatus((prev) => ({
          ...prev,
          document: null,
          success: true,
        }));
      }
    } catch (error) {
      setDeleteOperationStatus((prev) => ({
        ...prev,
        error: error.message || "Unknown Error!",
      }));
    }
  };
  return [deleteOperationStatus, deleteDoc];
};

import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

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

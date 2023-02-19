import { useEffect, useState } from "react";
import { firestore, timestamp } from "../firebase/config";

// Encapsulate an operation in a hook so that it becomes safer and react-ful
export const useAddDocument = (collectionName) => {
  const [addOperationStatus, setAddOperationStatus] = useState({
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
  const addDoc = async (doc) => {
    const createdAt = timestamp.fromDate(new Date());
    try {
      const addedDocument = await firestore
        .collection(collectionName)
        .add({ ...doc, createdAt });
      if (!isCancelled) {
        setAddOperationStatus((prev) => ({
          ...prev,
          document: addedDocument,
          success: true,
        }));
      }
    } catch (error) {
      setAddOperationStatus((prev) => ({
        ...prev,
        error: error.message || "Unknown Error!",
      }));
    }
  };
  return [addOperationStatus, addDoc]
};

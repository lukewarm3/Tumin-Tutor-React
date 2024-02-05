import React from "react";
import { useEffect } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetTutorNameById = (tutorId) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const showToast = useShowToast();
  const [tutorName, setTutorName] = React.useState(null);

  useEffect(() => {
    if (!tutorId) {
      // Check if tutorId is valid
      console.log("Invalid tutorId:", tutorId);
      setIsLoading(false);
      setTutorName(null);
      return;
    }
    
    const getTutorName = async () => {
      setIsLoading(true);
      try {
        const userRef = doc(db, "users", tutorId);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          return setUserProfile(null);
        }

        setTutorName(userDoc.data().fullName);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    getTutorName();
  }, [setTutorName, tutorId, showToast]);

  return { isLoading, tutorName, setTutorName };
};

export default useGetTutorNameById;

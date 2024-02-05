import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetTutors = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tutors, setTutors] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getTutors = async () => {
      setIsLoading(true);
      try {
        // get all users from the database
        const tutorsArray = [];
        const q = query(collection(db, "users"), where("isTutor", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((tutor) => {
            tutorsArray.push({ id: tutor.id, ...tutor.data() });
        });

        setTutors(tutorsArray);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getTutors();
  }, [authUser, showToast]);
  return { isLoading, tutors };
};

export default useGetTutors;

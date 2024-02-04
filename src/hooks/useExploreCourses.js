import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const useExploreCourses = (courseName) => {
  const [isLoading, setIsLoading] = useState(false);
  const [studyGroups, setStudyGroups] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const exploreCourses = async () => {
      setIsLoading(true);
      try {
        // get all users who are not the current user
        const q = query(
            collection(db, "groups"),
            where("courseName", "==", courseName),
        );
        const querySnapshot = await getDocs(q);
        const group = [];
        querySnapshot.forEach((doc) => {
            group.push({...doc.data(), id: doc.id});
        });

        setStudyGroups(group);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) exploreCourses();
  }, [authUser, showToast]);
  return { isLoading, studyGroups };
};

export default useExploreCourses;
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

const useGetCourses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        // get all users from the database
        const coursesObject = {};
        const q = query(collection(db, "groups"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((group) => {
          const { courseName } = group.data();
          if (coursesObject[courseName]) {
            coursesObject[courseName] += 1;
          } else {
            coursesObject[courseName] = 1;
          }
        });

        const coursesArray = Object.entries(coursesObject).map(
          ([courseName, count]) => ({
            courseName,
            count,
          })
        );

        setCourses(coursesArray);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getCourses();
  }, [authUser, showToast]);
  return { isLoading, courses };
};

export default useGetCourses;

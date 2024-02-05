import { useEffect, useState } from "react";
import useGroupStore from "../store/groupStore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useGetStudyGroups = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { groups, setGroups } = useGroupStore();
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getStudyGroups = async () => {
      setIsLoading(true);
      const q = query(collection(db, "groups"));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        const studyGroups = [];

        querySnapshot.forEach((group) => {
          studyGroups.push({ id: group.id, ...group.data() });
        });

        studyGroups.sort((a, b) => b.createdAt - a.createdAt);
        setGroups(studyGroups);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getStudyGroups();
  }, [authUser, showToast, setGroups]);

  return { isLoading, groups };
};

export default useGetStudyGroups;

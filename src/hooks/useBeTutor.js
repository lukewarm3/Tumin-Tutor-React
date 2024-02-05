import { useState } from "react";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useGroupStore from "../store/groupStore";
import useShowToast from "./useShowToast";
import { db } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const useBeTutor = (groupId) => {
  const [isUpdating2, setIsUpdating2] = useState(false);
  const [isBeingTutor, setIsBeingTutor] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { addTutor, removeTutor } = useGroupStore();
  const showToast = useShowToast();

  const handleBeTutor = async () => {
    if (authUser?.schdule === "" || authUser?.tutorInfo === "") {
        showToast("Error", "Please edit your schedule and tutor info first", "error");
        return;
    }
    setIsUpdating2(true);
    try {
      const userRef = doc(db, "users", authUser?.uid);
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(userRef, {
        groupTutor: isBeingTutor ? "" : groupId,
      });
      await updateDoc(groupRef, {
        tutor: isBeingTutor ? "" : authUser?.uid,
      });
      if (isBeingTutor) {
        // unfollow
        setAuthUser({
          ...authUser,
          groupTutor: "",
        });
        removeTutor(groupId);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            groupTutor: "",
          })
        );
        setIsBeingTutor(false); // asynchrous state update
      } else {
        // follow
        setAuthUser({
          ...authUser,
          groupTutor: groupId,
        });
        addTutor(groupId, authUser?.uid);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            groupTutor: groupId,
          })
        );
        setIsBeingTutor(true); // asynchrous state update
      }
    } catch (error) {
      //showToast("Error", error.message, "error");
    } finally {
      setIsUpdating2(false);
    }
  };

  useEffect(() => {
    if (authUser) setIsBeingTutor(authUser.groupTutor === groupId);
  }, [authUser, groupId]);

  return { isUpdating2, isBeingTutor, handleBeTutor };
};

export default useBeTutor;

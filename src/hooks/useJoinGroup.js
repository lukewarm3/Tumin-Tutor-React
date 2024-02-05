import { useState } from "react";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useGroupStore from "../store/groupStore";
import useShowToast from "./useShowToast";
import { db } from "../firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const useJoinGroup = (groupId) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isJoinning, setIsJoinning] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const { joinGroup, leaveGroup } = useGroupStore();
  const showToast = useShowToast();

  console.log("groupId", groupId);
  console.log("author include", authUser.groups.includes(groupId));
  console.log("isJoinning", isJoinning);
  console.log("groups", authUser.groups);
  console.log("auth", authUser);

  const handleJoinGroup = async () => {
    setIsUpdating(true);
    try {
      const userRef = doc(db, "users", authUser?.uid);
      const groupRef = doc(db, "groups", groupId);
      await updateDoc(userRef, {
        groups: isJoinning ? arrayRemove(groupId) : arrayUnion(groupId),
      });
      await updateDoc(groupRef, {
        students: isJoinning
          ? arrayRemove(authUser?.uid)
          : arrayUnion(authUser?.uid),
      });
      if (isJoinning) {
        // unfollow
        setAuthUser({
          ...authUser,
          groups: authUser.groups.filter((id) => id !== groupId),
        });
        leaveGroup(groupId);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            groups: authUser.groups.filter((id) => id !== groupId),
          })
        );
        setIsJoinning(false); // asynchrous state update
      } else {
        // follow
        setAuthUser({
          ...authUser,
          groups: [...authUser.groups, groupId],
        });
        joinGroup(groupId);
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...authUser,
            groups: [...authUser.groups, groupId],
          })
        );
        setIsJoinning(true); // asynchrous state update
      }
    } catch (error) {
      //showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (authUser) setIsJoinning(authUser.groups.includes(groupId));
  }, [authUser, groupId]);

  return { isUpdating, isJoinning, handleJoinGroup };
};

export default useJoinGroup;

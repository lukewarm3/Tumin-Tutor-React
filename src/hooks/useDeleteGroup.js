import React from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import useGroupStore from "../store/groupStore";
import { db, storage } from "../firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import { doc, updateDoc, arrayRemove, deleteDoc } from "firebase/firestore";

const useDeleteGroup = () => {
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const deleteGroup = useGroupStore((state) => state.deleteGroup);

  const handleDeleteGroup = async (group) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      console.log("group.id", group.id);
      console.log("group", group);

      const imageRef = ref(storage, `groups/${group.id}`);

      await deleteObject(imageRef);  //update storage
      const userRef = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "groups", group.id));  // update groups firebase

      await updateDoc(userRef, {
        groups: arrayRemove(group.id),  // update user firebase
      });

      deleteGroup(group.id);  // update global state of groups

      // update global state of user
      setAuthUser({
        ...authUser,
        groups: authUser.groups.filter((id) => id !== group.id),
      });

      localStorage.setItem(
        "user-info",
        JSON.stringify({
          ...authUser,
          groups: authUser.groups.filter((id) => id !== group.id),
        })
      );

      showToast("Success", "Study Group deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };
  return { isDeleting, handleDeleteGroup };
};

export default useDeleteGroup;

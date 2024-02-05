import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import {
  doc,
  updateDoc,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const showToast = useShowToast();

  const editProfile = async (inputs) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const userDocRef = doc(db, "users", authUser.uid);

    try {
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName || authUser.fullName,
        tutorInfo: inputs.tutorInfo || authUser.tutorInfo,
        schedule: inputs.schedule || authUser.schedule,
      };

      if (updatedUser.tutorInfo === "" || updatedUser.schedule === "") {
        showToast(
          "Error",
          "Reminder: you need to fill in all fields in order to be the tutor",
          "error"
        );
        updatedUser.isTutor = false;
      } else {
        updatedUser.isTutor = true;
      }

      await updateDoc(userDocRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;

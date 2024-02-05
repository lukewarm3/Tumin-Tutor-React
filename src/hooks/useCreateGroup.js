import { useState } from "react";
import useAuthStore from "../store/authStore";
import useGroupStore from "../store/groupStore";
import useShowToast from "./useShowToast";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const useCreateGroup = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const createGroup = useGroupStore((state) => state.createGroup);

  const handleCreateGroup = async (selectedFile, inputs) => {
    if (isLoading) return;
    if (!selectedFile) {
      showToast("Error", "Please select an image", "error");
      return;
    }
    if (!inputs.groupName) {
      showToast("Error", "Please give a group name", "error");
      return;
    }
    if (!inputs.courseName) {
      showToast("Error", "Please give a course name", "error");
      return;
    }
    if (!inputs.description) {
      showToast("Error", "Please give a description", "error");
      return;
    }
    setIsLoading(true);

    const newGroup = {
      groupName: inputs.groupName,
      courseName: inputs.courseName,
      description: inputs.description,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      tutor: "",
      imgURL: "",
      students: [authUser.uid],
    };

    try {
      const groupDocRef = await addDoc(collection(db, "groups"), newGroup);
      const userDocRef = doc(db, "users", authUser.uid);
      const imageRef = ref(storage, `groups/${groupDocRef.id}`);

      // update user firebase
      await updateDoc(userDocRef, {
        groups: arrayUnion(groupDocRef.id),
      });

      // upload image to storage
      await uploadString(imageRef, selectedFile, "data_url");

      const donwloadURL = await getDownloadURL(imageRef);

      // update group firebase
      await updateDoc(groupDocRef, {
        imgURL: donwloadURL,
      });

      newGroup.imgURL = donwloadURL;

      // update global state of groups
      createGroup(newGroup);

      // update global state of user
      setAuthUser({
        ...authUser,
        groups: [...authUser.groups, groupDocRef.id],
      });

      localStorage.setItem(
        "user-info",
        JSON.stringify({
          ...authUser,
          groups: [...authUser.groups, groupDocRef.id],
        })
      );

      showToast("Success", "Group created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreateGroup };
};

export default useCreateGroup;

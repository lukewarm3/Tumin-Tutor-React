import { auth } from "../firebase/firebase";
import { useSignOut } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";
import { FaSleigh } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useLogout = () => {
  const [signOut, isLoggedOut, error] = useSignOut(auth);
  //const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const userDocRef = doc(db, "users", authUser.uid);

      const updatedUser = {
        ...authUser,
        isStudent: false,
        isTutor: false,
      };

      await updateDoc(userDocRef, updatedUser);
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser(); //when clicking log out, the page will automatically navigate to the auth page since the global state is now null
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return { handleLogout, isLoggedOut, error };
};

export default useLogout;

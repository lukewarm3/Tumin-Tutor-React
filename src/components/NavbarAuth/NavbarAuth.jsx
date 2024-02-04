import React from "react";
import { Link } from "react-router-dom";
import { Container, Flex, Image, Button, Text } from "@chakra-ui/react";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";

const NavbarAuth = () => {
  // Google Auth
  const [signInWithGoogle, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      const userRef = doc(db, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // login and do not create the userDoc into the firestore database again
        const userDoc = userSnap.data();
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      } else {
        // signup, create the userDoc
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          tutorInfo: "",
          schedule: "",
          profilePicURL: newUser.user.photoURL,
          createdAt: Date.now(),
          groups: [],
          logInAsStudent: false,
          logInAsTutor: false,
          isTutor: false,
        };
        await setDoc(doc(db, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Container
      maxWidth={"container.lg"}
      my={4}
      boxShadow="0 3px 12px -10px rgba(0, 0, 0, 0.5)"
    >
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
        p={3}
      >
        <Flex alignItems={"center"} gap={3}>
          <Image
            src="/tumin_logo.png"
            h={10}
            display={{ base: "none", sm: "block" }}
            cursor={"pointer"}
          />
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Tumin
          </Text>
        </Flex>
        <Flex gap={4}>
          <Button
            colorScheme={"blue"}
            size={"sm"}
            borderRadius={"full"}
            px={5}
            onClick={handleGoogleAuth}
          >
            Sign In
          </Button>

          <Button
            variant={"outline"}
            size={"sm"}
            borderRadius={"full"}
            px={5}
            onClick={handleGoogleAuth}
          >
            Sign Up
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default NavbarAuth;

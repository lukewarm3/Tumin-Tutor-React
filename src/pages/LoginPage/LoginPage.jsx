import React from "react";
import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import NavbarAuth from "../../components/NavbarAuth/NavbarAuth";
import { Text, Button } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { db } from "../../firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

const LoginPage = () => {
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const showToast = useShowToast();

  const handleLoginAsStudent = async () => {
    if (!authUser) {
      showToast("Error", "Please login to continue", "error");
      return;
    }

    try {
      const userDocRef = doc(db, "users", authUser.uid);

      const updatedUser = {
        ...authUser,
        isStudent: true,
        isTutor: false,
      };

      await updateDoc(userDocRef, updatedUser);
      setAuthUser(updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const handleLoginAsTutor = async () => {
    if (!authUser) {
      showToast("Error", "Please login to continue", "error");
      return;
    }

    try {
      const userDocRef = doc(db, "users", authUser.uid);

      const updatedUser = {
        ...authUser,
        isStudent: false,
        isTutor: true,
      };

      await updateDoc(userDocRef, updatedUser);
      setAuthUser(updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      {authUser ? null : <NavbarAuth />}
      <Flex
        minH={"90vh"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
      >
        <Container>
          <Flex justifyContent={"center"} alignItems={"center"} gap={200}>
            {/* Left Side */}
            <VStack justifyContent={"center"} alignItems={"center"} gap={4}>
              <Image src="/studentImage.jpg" alt="student" height={"150px"} />
              <Text fontSize="4xl" fontWeight={"900"} whiteSpace={"nowrap"}>
                Find a tutor
              </Text>
              <Text whiteSpace={"nowrap"}>
                Start your learning journey,
                <br />
                discover your Perfect Tutor
              </Text>
              <Button
                colorScheme={"blue"}
                color={"white"}
                borderRadius={"full"}
                onClick={handleLoginAsStudent} // first sign up, then login
              >
                Login as a Student
              </Button>
            </VStack>
            {/* // Right Side */}
            <VStack justifyContent={"center"} alignItems={"center"} gap={4}>
              <Image src="/tutorImage.png" alt="tutor" height={"150px"} />
              <Text fontSize="4xl" fontWeight={"bold"} whiteSpace={"nowrap"}>
                Become a tutor
              </Text>
              <Text whiteSpace={"nowrap"}>
                Share your knowledge and
                <br />
                unlock your teaching potential
              </Text>
              <Button
                colorScheme={"blue"}
                color={"white"}
                borderRadius={"full"}
                onClick={handleLoginAsTutor}
              >
                Login as a tutor
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default LoginPage;

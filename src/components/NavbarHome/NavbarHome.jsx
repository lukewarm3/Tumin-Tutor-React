import React from "react";
import {
  Container,
  Flex,
  Image,
  Button,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { SlPaperPlane } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/react";
import Tutors from "../Tutors/Tutors";
import { CgProfile } from "react-icons/cg";
import useAuthStore from "../../store/authStore";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";

const NavbarHome = () => {
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleLogout, isLoggedOut } = useLogout();
  return (
    <Container
      minWidth={"full"}
      boxShadow="0 3px 12px -10px rgba(0, 0, 0, 0.5)"
    >
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
        p={5}
        px={10}
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
          <InputGroup mx={20}>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search courses"
              borderRadius={"full"}
              backgroundColor={"gray.200"}
              minWidth={400}
            />
          </InputGroup>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontWeight={"bold"}>
            Login As {authUser?.isStudent ? "Student" : "Tutor"}
          </Text>
          {authUser?.isTutor ? (
            <Button
              borderRadius={"full"}
              backgroundColor={"white"}
              border={"3px solid"}
            >
              <Flex gap={3} alignItems={"center"}>
                <CgProfile borderColor="teal.900" />
                <Text color={"teal.900"} fontWeight={100}>
                  Edit Profile
                </Text>
              </Flex>
            </Button>
          ) : null}

          {authUser?.isStudent ? (
            <Button
              borderRadius={"full"}
              backgroundColor={"teal.900"}
              onClick={onOpen}
            >
              <Flex gap={3} alignItems={"center"}>
                <SlPaperPlane color="white" />
                <Text color={"white"} fontWeight={100}>
                  Request Tutor
                </Text>
              </Flex>
            </Button>
          ) : null}

          <Button
            borderRadius={"full"}
            backgroundColor={"white"}
            border={"3px solid"}
            onClick={handleLogout}
            isLoading={isLoggedOut}
          >
            <Flex gap={3} alignItems={"center"}>
              <IoLogOutOutline />
              <Text color={"teal.900"} fontWeight={900}>
                Logout
              </Text>
            </Flex>
          </Button>
        </Flex>
      </Flex>
      {isOpen && <Tutors isOpen={isOpen} onClose={onClose} />}
    </Container>
  );
};

export default NavbarHome;

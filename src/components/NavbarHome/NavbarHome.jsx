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

const NavbarHome = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Flex gap={4}>
          <Button borderRadius={"full"} backgroundColor={"teal.900"} onClick={onOpen}>
            <Flex gap={3}>
              <SlPaperPlane color="white" />
              <Text color={"white"} fontWeight={100}>
                Request Tutor
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

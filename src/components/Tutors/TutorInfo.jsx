import React from "react";
import {
  Flex,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Avatar,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegCalendarAlt } from "react-icons/fa";

const TutorInfo = ({ tutor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex direction={"column"} w="full" cursor={"pointer"} onClick={onOpen}>
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <Flex gap={5} alignItems={"center"}>
            <Avatar size={"lg"} src={tutor.profilePicURL} />
            <Flex direction={"column"} alignItems={"flex-start"}>
              <Text fontSize={20} fontWeight={"bold"}>
                {tutor.fullName}
              </Text>
              <Text>{tutor.tutorInfo}</Text>
            </Flex>
          </Flex>
          <Button px={7} bg={"transparent"} border={"1px solid black"}>
            Book
          </Button>
        </Flex>
        <Divider my={5} bg={"black"} borderColor={"gray.400"} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" width="full" py={3} gap={3}>
              {/* Tutor Information */}
              <Flex justifyContent={"flex-start"} alignItems={"center"}>
                <Avatar src={tutor.profilePicURL} size="lg" />
              </Flex>
              <Text fontSize={"lg"} fontWeight={"bold"}>
                {tutor.fullName}
              </Text>
              <Text fontSize={"sm"}>{tutor.tutorInfo}</Text>
              <Text>
                <Text as={"span"} fontWeight={"bold"}>
                  Available:
                </Text>{" "}
                {tutor.schedule}
              </Text>

              <Divider my={5} bg={"black"} borderColor={"gray.400"} />

              {/* contact information */}
              <Flex direction={"column"} gap={3}>
                <Flex
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={3}
                >
                  <FaRegCalendarAlt />
                  <Text>Your contact info</Text>
                </Flex>

                <FormControl>
                  <FormLabel fontSize={"sm"}>First Name</FormLabel>
                  <Input
                    name={"FirstName"}
                    placeholder={"First Name"}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Last Name</FormLabel>
                  <Input
                    name={"LastName"}
                    placeholder={"Last Name"}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Email</FormLabel>
                  <Input
                    name={"email"}
                    placeholder={"Email"}
                    size={"sm"}
                    type={"email"}
                  />
                </FormControl>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              bg={"transparent"}
              _hover={{ bg: "gray.200" }}
              color="black"
              fontWeight={200}
            >
              Cancel
            </Button>
            <Button color="white" bg="teal.900" fontWeight={200}>
              Book time
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TutorInfo;

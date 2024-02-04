import React from "react";
import {
  GridItem,
  Flex,
  Avatar,
  VStack,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
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
import { BsPeopleFill } from "react-icons/bs";

const StudyGroup = ({ group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem colSpan={1}
        p={5}
        boxShadow="base"
        rounded="md"
        bg="white"
        minHeight={150}
        onClick={onOpen}
        cursor={"pointer"}
      >
        <Flex flexDirection="column" gap={5}>
          {/* title */}
          <Flex alignItems={"center"} gap={20}>
            <Flex gap={5}>
              <Avatar src={group.imgURL} size="md" />
              <VStack alignItems={"flex-start"} gap={0}>
                <Text fontWeight="bold" fontSize={"lg"}>
                  {group.groupName}
                </Text>
                <Text fontSize={"sm"}>
                  {group.students.length}{" "}
                  {group.students.length <= 1 ? "member" : "members"} •{" "}
                  {group.students.length <= 8 ? (
                    <Text as={"span"} fontWeight={"bold"} color={"green.400"}>
                      Open
                    </Text>
                  ) : (
                    <Text as={"span"} fontWeight={"bold"} color={"red.400"}>
                      {" "}
                      Closed{" "}
                    </Text>
                  )}
                </Text>
              </VStack>
            </Flex>
            <Flex gap={3}>
              <Button
                size={"sm"}
                bg={"transparent"}
                border={"1px solid"}
                borderColor={"gray.300"}
              >
                <FaRegCalendarAlt />
              </Button>
              <Button
                size={"sm"}
                bg={"transparent"}
                border={"1px solid"}
                borderColor={"gray.300"}
              >
                <IoChatbubbleOutline />
              </Button>
            </Flex>
          </Flex>

          {/* the class information and the tutor name */}
          <Flex flexWrap={"wrap"} gap={3}>
            <Flex alignItems={"center"} gap={2}>
              <PiBooks size={20} />
              <Text fontSize={15}>{group.courseName}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <FaChalkboardTeacher size={20} />
              <Text fontSize={15}>{group.tutor}</Text>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{group.courseName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" width="full" gap={3}>
              {/* member number and tutor name */}
              <Flex
                direction={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={2}
                mb={5}
              >
                <BsPeopleFill size={20} />
                <Text fontSize={15}>
                  {group.students.length <= 1 ? "member" : "members"} •{" "}
                </Text>
                <FaChalkboardTeacher size={20} />
                <Text fontSize={15}>{group.tutor}</Text>
              </Flex>
              {/* study group description */}
              <Text whiteSpace="pre-line">{group.description}</Text>

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
              Join this study group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudyGroup;

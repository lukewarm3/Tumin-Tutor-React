import React from "react";
import { Flex, Button, Text, Divider } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import useExploreCourses from "../../hooks/useExploreCourses";
import StudyGroup from "../StudyGroups/StudyGroup";

const CourseCard = ({ course }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, studyGroups} = useExploreCourses(course.courseName);

  return (
    <>
      <Flex direction={"column"} w="full">
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <Flex direction={"column"}>
            <Text fontSize={20} fontWeight={"bold"}>
              {course.courseName}
            </Text>
            <Text>
              {course.count} {course.count <= 1 ? "course" : "courses"}
            </Text>
          </Flex>
          <Button
            px={7}
            bg={"transparent"}
            border={"1px solid black"}
            onClick={onOpen}
            isLoading={isLoading}
          >
            Explore
          </Button>
        </Flex>
        <Divider my={5} bg={"black"} borderColor={"gray.400"} />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{course.courseName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              width="full"
              py={3}
              gap={3}
              maxHeight={"600px"}
              overflowY={"auto"}
              pr={3}
            >
              {studyGroups.map((group) => (
                <StudyGroup key={group.id} group={group} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseCard;

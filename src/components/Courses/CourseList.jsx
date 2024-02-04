import React from "react";
import {
  Box,
  Flex,
  Avatar,
  VStack,
  Text,
  Button,
  Link,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import CourseCard from "./CourseCard";
import useGetCourses from "../../hooks/useGetCourses";

const CourseList = () => {
  const { isLoading, courses } = useGetCourses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack px={6} gap={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"full"}
          mb={5}
        >
          <Text fontSize={20} fontWeight={"bold"}>
            Browse Courses
          </Text>
          <Button
            fontSize={14}
            fontWeight={"bold"}
            color={"gray.600"}
            _hover={{ color: "gray.400", bg: "transparent" }}
            cursor={"pointer"}
            bg={"transparent"}
            onClick={onOpen}
          >
            See All
          </Button>
        </Flex>

        {isLoading && (
          <Flex flexDirection={"column"} gap={10} width="full">
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
              <Flex alignItems={"center"} gap={3}>
                <SkeletonCircle size="12" />
                <Flex flexDirection={"column"} gap={3}>
                  <Skeleton height="10px" width="300px" />
                  <Skeleton height="10px" width="450px" />
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}

        {!isLoading && (
          <Flex flexDirection={"column"} w="full">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Flex>
        )}

        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
          © 2023 Built By{" "}
          <Link
            href="https://github.com/lukewarm3"
            target="_blank"
            color="blue.500"
            fontSize={14}
          >
            Luke Cao
          </Link>
        </Box>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tutor List</ModalHeader>
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
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseList;

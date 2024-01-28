import React from "react";
import { Box, Flex, Avatar, VStack, Text, Button, Link } from "@chakra-ui/react";
import CourseCard from "./CourseCard";

const CourseList = () => {
  return (
    <VStack px={6} gap={4}>
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"} mb={5}>
        <Text fontSize={20} fontWeight={"bold"}>
          Browse Courses
        </Text>
        <Text
          fontSize={14}
          fontWeight={"bold"}
          color={"gray.600"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>

      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />
      <CourseCard />

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
  );
};

export default CourseList;

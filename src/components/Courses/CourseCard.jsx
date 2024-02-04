import React from "react";
import { Flex, Button, Text, Divider } from "@chakra-ui/react";


const CourseCard = ({course}) => {
  console.log(course);
  return (
    <>
      <Flex direction={"column"} w="full" >
        <Flex justifyContent={"space-between"} alignItems={"center"} w="full">
          <Flex direction={"column"}>
            <Text fontSize={20} fontWeight={"bold"}>
              {course.courseName}
              
            </Text>
            <Text>{course.count} {course.count <= 1 ? "course" : "courses"}</Text>
          </Flex>
          <Button px={7} bg={"transparent"} border={"1px solid black"}>Explore</Button>
        </Flex>
        <Divider my={5} bg={"black"} borderColor={"gray.400"} />
      </Flex>
    </>
  );
};

export default CourseCard;

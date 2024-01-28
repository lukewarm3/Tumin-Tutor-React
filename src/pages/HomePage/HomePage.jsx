import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import StudyGroupList from "../../components/StudyGroups/StudyGroupList";
import CourseList from "../../components/Courses/CourseList";

const HomePage = () => {
  return (
    <>
      <Box mx={10} mt={10}>
        <Flex gap={10}>
          <Box flex={2} pb={4}>
            <StudyGroupList />
          </Box>
          <Box
            flex={3}
            mr={8}
            display={{ base: "none", lg: "block" }}
            maxW={"25vw"}
          >
            <CourseList />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default HomePage;

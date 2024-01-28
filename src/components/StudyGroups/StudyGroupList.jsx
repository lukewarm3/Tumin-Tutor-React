import React from "react";
import { Box, Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import StudyGroup from "./StudyGroup";

const StudyGroupList = () => {
  return (
    <>
      <Flex display="column">
        <Flex
          w={"full"}
          justifyContent={{ base: "center", sm: "space-between" }}
          alignItems={"center"}
          pb={3}
        >
          <Text fontWeight={"bold"} fontSize={20}>
            My Study Groups
          </Text>
          <Button
            borderRadius="full"
            bg={"transparent"}
            border={"1.5px solid black"}
          >
            <Text fontWeight="bold" fontSize={"2xl"} mr={3}>
              +
            </Text>
            <Text fontWeight={200}>Create Study Group</Text>
          </Button>
        </Flex>
        <SimpleGrid spacing={10} minChildWidth="350px">
          <StudyGroup />
          <StudyGroup />
          <StudyGroup />
          <StudyGroup />
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default StudyGroupList;

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaChartPie } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const Sidebar = () => {
  return (
    <Box
      h="100vh"
      borderRight={"1px solid"}
      borderColor={"gray.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 3, md: 6 }}
      height={"93vh"}
    >
      <Flex direction={"column"} w={"full"}>
        <Flex alignItems={"center"} cursor={"pointer"} gap={4} my={3}>
          <FaChartPie style={{ color: "#CCCCCC", fontSize: "25" }} />
          <Text color="gray.400" fontSize={"lg"}>
            Overview
          </Text>
        </Flex>
        <Flex alignItems={"center"} cursor={"pointer"} gap={3} my={3}>
          <GiGraduateCap style={{ color: "#CCCCCC", fontSize: "30" }} />
          <Text color="gray.400" fontSize={"lg"}>
            Study Groups
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;

import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NavbarHome from "../components/NavbarHome/NavbarHome";
import Sidebar from "../components/Sidebar/Sidebar";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Flex display="column">
        {/* navbar */}
        {pathname == "/" ? (
          <Flex>
            <NavbarHome />
          </Flex>
        ) : null}
        <Flex>
          {/* sidebar */}
          {pathname == "/" ? (
            <Box w={{ base: "70px", md: "220px" }}>
              <Sidebar />
            </Box>
          ) : null}

          {/* page content */}
          <Box
            flex={1}
            w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
            mx="auto"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default PageLayout;

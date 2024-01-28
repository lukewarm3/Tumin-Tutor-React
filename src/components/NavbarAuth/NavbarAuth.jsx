import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, Image, Button, Text } from '@chakra-ui/react'

const NavbarAuth = () => {
  return (
    <Container
      maxWidth={"container.lg"}
      my={4}
      boxShadow="0 3px 12px -10px rgba(0, 0, 0, 0.5)"
    >
      <Flex
        w={"full"}
        justifyContent={{ base: "center", sm: "space-between" }}
        alignItems={"center"}
        p={3}
      >
        <Flex alignItems={"center"} gap={3}>
          <Image
            src="/tumin_logo.png"
            h={10}
            display={{ base: "none", sm: "block" }}
            cursor={"pointer"}
          />
          <Text fontWeight={"bold"} fontSize={"xl"}>
            Tumin
          </Text>
        </Flex>
        <Flex gap={4}>
          <Link to="/auth">
            <Button
              colorScheme={"blue"}
              size={"sm"}
              borderRadius={"full"}
              px={5}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/auth">
            <Button
              variant={"outline"}
              size={"sm"}
              borderRadius={"full"}
              px={5}
            >
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default NavbarAuth
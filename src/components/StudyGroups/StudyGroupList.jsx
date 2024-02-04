import React from "react";
import { Box, Flex, Text, Button, SimpleGrid } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Center,
  Avatar,
} from "@chakra-ui/react";
import StudyGroup from "./StudyGroup";
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
import usePreviewimg from "../../hooks/usePreviewimg";
import useCreateGroup from "../../hooks/useCreateGroup";

const StudyGroupList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = React.useState({
    groupName: "",
    courseName: "",
    description: "",
  });
  const fileRef = React.useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewimg();

  const { isLoading, handleCreateGroup } = useCreateGroup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateGroupComplete = async () => {
    try {
      await handleCreateGroup(selectedFile, formData);
      setFormData({ groupName: "", courseName: "", description: "" });
      setSelectedFile(null);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Stack spacing={4} w={"full"} maxW={"md"} p={6} my={0}>
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Create Study Group
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={selectedFile}
                        name="group image"
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => fileRef.current.click()}>
                        Study Group Image
                      </Button>
                    </Center>
                    <Input
                      type="file"
                      hidden
                      ref={fileRef}
                      onChange={handleImageChange}
                      required
                    />
                  </Stack>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Group Name</FormLabel>
                  <Input
                    name={"groupName"}
                    placeholder={"group name"}
                    size={"sm"}
                    type={"text"}
                    value={formData.groupName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Course Name</FormLabel>
                  <Input
                    name={"courseName"}
                    placeholder={"eg. WR 13100-Writing and Rhetoric"}
                    size={"sm"}
                    type={"text"}
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Description</FormLabel>
                  <Input
                    name={"description"}
                    placeholder={"description"}
                    size={"sm"}
                    type={"text"}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    isLoading={isLoading}
                    onClick={handleCreateGroupComplete}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StudyGroupList;

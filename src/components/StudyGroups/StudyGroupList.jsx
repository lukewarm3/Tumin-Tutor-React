import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Center,
  Avatar,
  Grid,
  Skeleton,
  SkeletonCircle,
  GridItem,
} from "@chakra-ui/react";
import StudyGroup from "./StudyGroup";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import usePreviewimg from "../../hooks/usePreviewimg";
import useCreateGroup from "../../hooks/useCreateGroup";
import useGetStudyGroups from "../../hooks/useGetStudyGroups";

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
  const { isUpdating, groups } = useGetStudyGroups();

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

        {isUpdating && (
          <Grid gap={10} templateColumns="repeat(3, 1fr)">
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
              <GridItem colSpan={1}>
                <Flex alignItems={"center"} gap={3}>
                  <SkeletonCircle size="12" />
                  <Flex flexDirection={"column"} gap={3}>
                    <Skeleton height="10px" width="200px" />
                    <Skeleton height="10px" width="300px" />
                  </Flex>
                </Flex>
              </GridItem>
            ))}
          </Grid>
        )}

        {!isUpdating && (
          <Grid gap={10} templateColumns="repeat(3, 1fr)">
            {groups.map((group) => (
              <StudyGroup key={group.id} group={group} />
            ))}
          </Grid>
        )}
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
                    />
                  </Stack>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Group Name</FormLabel>
                  <Input
                    name={"groupName"}
                    placeholder={"group name"}
                    size={"sm"}
                    type={"text"}
                    value={formData.groupName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontSize={"sm"}>Course Name</FormLabel>
                  <Input
                    name={"courseName"}
                    placeholder={"eg. WR 13100"}
                    size={"sm"}
                    type={"text"}
                    value={formData.courseName}
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl isRequired>
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

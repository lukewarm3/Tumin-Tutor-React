import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Flex,
  Text,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Stack,
  Center,
  Heading,
} from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import useEditProfile from "../../hooks/useEditProfile";

const EditProfile = ({ isOpen, onClose }) => {
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [formData, setFormData] = React.useState({
    fullName: "",
    tutorInfo: "",
    schedule: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { isUpdating, editProfile } = useEditProfile();

  const handleEditProfile = async () => {
    try {
      await editProfile(formData);
      setFormData({ fullName: "", tutorInfo: "", schedule: "" });
      onClose();
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Stack spacing={4} w={"full"} maxW={"md"} p={6} my={0}>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                Edit Profile
              </Heading>

              <FormControl>
                <FormLabel fontSize={"sm"}>Full Name</FormLabel>
                <Input
                  name={"fullName"}
                  placeholder={"full name"}
                  size={"sm"}
                  type={"text"}
                  value={formData.fullName || authUser.fullName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"sm"}>Tutor Info</FormLabel>
                <Input
                  name={"tutorInfo"}
                  placeholder={"eg. Chemistry Major"}
                  size={"sm"}
                  type={"text"}
                  value={formData.tutorInfo}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"sm"}>Schedule</FormLabel>
                <Input
                  name={"schedule"}
                  placeholder={"eg. MWF 10:00 - 11:00 AM"}
                  size={"sm"}
                  type={"text"}
                  value={formData.schedule}
                  onChange={handleChange}
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
                  isLoading={isUpdating}
                  onClick={handleEditProfile}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;

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
} from "@chakra-ui/react";
import TutorInfo from "./TutorInfo";
import useGetTutors from "../../hooks/useGetTutors";

const Tutors = ({ isOpen, onClose }) => {
  const {isLoading, tutors} = useGetTutors();

  if (isLoading) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tutor List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" width="full" py={3} gap={3} maxHeight={"600px"} overflowY={"auto"} pr={3}>
            {!isLoading && tutors.map((tutor) => (
              <TutorInfo key={tutor.id} tutor={tutor} />
            ))}
            
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Tutors;

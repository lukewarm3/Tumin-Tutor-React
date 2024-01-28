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

const Tutors = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tutor List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" width="full" py={3} gap={3} maxHeight={"600px"} overflowY={"auto"} pr={3}>
            <TutorInfo />
            <TutorInfo />
            <TutorInfo />
            <TutorInfo />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Tutors;

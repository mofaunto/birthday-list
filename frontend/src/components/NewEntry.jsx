import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datePickerOverrides.css";
import React, { useState } from "react";

const NewEntry = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState(null);
    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>This person is:</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder="John" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Who is it?</FormLabel>
                                <Input placeholder="Friend" />
                            </FormControl>
                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Gift ideas</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                placeholder="He likes gaming"
                            />
                        </FormControl>

                        <FormControl mt={4} w={"full"}>
                            <FormLabel>Birthday</FormLabel>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyyy-MM-dd"
                                customInput={
                                    <Input
                                        placeholder="yyyy-mm-dd"
                                        w={"full"}
                                    />
                                }
                            />
                        </FormControl>

                        <RadioGroup defaultValue="male" mt={4}>
                            <Flex gap={4}>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                            </Flex>
                        </RadioGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" mr={3}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewEntry;

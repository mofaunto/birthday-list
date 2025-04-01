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
    useToast,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datePickerOverrides.css";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPeople } from "../lib/api";

const NewEntry = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [gift, setGift] = useState("");
    const [gender, setGender] = useState("male");

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: postPeople,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["people"] });

            // toast

            toast({
                title: "Success",
                description: "New friend added successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // reset and close the modal
            setName("");
            setRole("");
            setGift("");
            setSelectedDate(null);
            setGender("male");
            onClose();
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name,
            role,
            description: gift,
            // need to convert date returned from api to better format
            birthday: selectedDate
                ? selectedDate.toISOString().split("T")[0]
                : null,
            gender,
        };

        mutation.mutate(newPerson);
    };

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
                        <form id="newEntryForm" onSubmit={handleSubmit}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        placeholder="John"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Who is it?</FormLabel>
                                    <Input
                                        placeholder="Friend"
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Gift ideas</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="He likes gaming"
                                    value={gift}
                                    onChange={(e) => setGift(e.target.value)}
                                />
                            </FormControl>

                            <FormControl mt={4} w={"full"}>
                                <FormLabel>Birthday</FormLabel>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="yyyy-MM-dd"
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    customInput={
                                        <Input
                                            placeholder="yyyy-mm-dd"
                                            w={"full"}
                                        />
                                    }
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup value={gender} onChange={setGender}>
                                    <Flex gap={4}>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Flex>
                                </RadioGroup>
                            </FormControl>
                        </form>
                    </ModalBody>

                    <ModalFooter gap={4}>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            type="submit"
                            form="newEntryForm"
                            isLoading={mutation.isLoading}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewEntry;

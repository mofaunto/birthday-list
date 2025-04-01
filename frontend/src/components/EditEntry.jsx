import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    IconButton,
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
import { BiEditAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../datePickerOverrides.css";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePeople } from "../lib/api";

const EditEntry = ({ friend }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();

    const [name, setName] = useState(friend.name);
    const [role, setRole] = useState(friend.role);
    const [description, setDescription] = useState(friend.description);
    const [selectedDate, setSelectedDate] = useState(
        friend.birthday ? new Date(friend.birthday) : null
    );
    const [gender, setGender] = useState(friend.gender);

    const mutation = useMutation({
        mutationFn: (updatedData) => updatePeople(friend.id, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["people"] });
            onClose();

            // toast
            toast({
                title: "Success",
                description: "Entry was edited successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedData = {
            name,
            role,
            description,
            birthday: selectedDate
                ? selectedDate.toISOString().split("T")[0]
                : null,
            gender,
        };
        mutation.mutate(updatedData);
    };

    return (
        <>
            <IconButton
                onClick={onOpen}
                variant={"ghost"}
                colorScheme="blue"
                aria-label="Edit Entry"
                size={"sm"}
                icon={<BiEditAlt size={20} />}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Friend</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <form id="editEntryForm" onSubmit={handleSubmit}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        placeholder="John"
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Who is it?</FormLabel>
                                    <Input
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        placeholder="Friend"
                                    />
                                </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Gift ideas</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="He likes gaming"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
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
                            form="editEntryForm"
                            isLoading={mutation.isLoading}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditEntry;

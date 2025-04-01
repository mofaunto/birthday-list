import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditEntry from "./EditEntry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePeople } from "../lib/api";

const FriendCard = ({ friend }) => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const toast = useToast();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: () => deletePeople(friend.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["people"] });

            // toast
            toast({
                title: "Success",
                description: "Entry was deleted successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate();
    };

    // Format the birthday to "22 Feb 2025"
    const formattedBirthday = friend.birthday
        ? new Date(friend.birthday).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
          })
        : "";

    console.log("friend", friend);

    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} alignItems={"center"} gap={4}>
                        <Avatar src={friend.imageUrl} />
                        <Box>
                            <Heading size={"sm"}>{friend.name}</Heading>
                            <Text>{friend.role}</Text>
                        </Box>
                    </Flex>

                    <Flex gap={2}>
                        <EditEntry friend={friend} />

                        <Popover
                            returnFocusOnClose={false}
                            isOpen={isOpen}
                            onClose={onClose}
                            placement="right"
                            closeOnBlur={false}
                        >
                            <PopoverTrigger>
                                <IconButton
                                    variant={"ghost"}
                                    colorScheme="red"
                                    size={"sm"}
                                    aria-label="Delete"
                                    icon={<BiTrash size={20} />}
                                    onClick={onToggle}
                                />
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverHeader fontWeight="semibold">
                                    Confirmation
                                </PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverBody>
                                    Are you sure you want to delete this entry?
                                </PopoverBody>
                                <PopoverFooter
                                    display="flex"
                                    justifyContent="flex-end"
                                >
                                    <ButtonGroup size="sm">
                                        <Button
                                            variant="outline"
                                            onClick={onToggle}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleDelete}
                                            colorScheme="red"
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </PopoverFooter>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </Flex>

                <Flex mt={4}>
                    <Text>{formattedBirthday}</Text>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>{friend.description}</Text>
            </CardBody>
        </Card>
    );
};

export default FriendCard;

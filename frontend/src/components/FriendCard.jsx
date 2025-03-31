import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditEntry from "./EditEntry";

const FriendCard = ({ friend }) => {
    return (
        <Card>
            <CardHeader>
                <Flex gap={4}>
                    <Flex flex={"1"} alignItems={"center"} gap={4}>
                        <Avatar src="https://avatar.iran.liara.run/public" />
                        <Box>
                            <Heading size={"sm"}>{friend.name}</Heading>
                            <Text>{friend.role}</Text>
                        </Box>
                    </Flex>

                    <Flex gap={2}>
                        <EditEntry friend={friend} />
                        <IconButton
                            variant={"ghost"}
                            colorScheme="red"
                            size={"sm"}
                            aria-label="Delete"
                            icon={<BiTrash size={20} />}
                        />
                    </Flex>
                </Flex>

                <Flex mt={4}>
                    <Text>{friend.birthday}</Text>
                </Flex>
            </CardHeader>

            <CardBody>
                <Text>{friend.description}</Text>
            </CardBody>
        </Card>
    );
};

export default FriendCard;

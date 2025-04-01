import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import FriendCard from "./FriendCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../lib/api";

const FriendsGrid = () => {
    const {
        data: people,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["people"],
        queryFn: fetchPeople,
    });

    if (isLoading) {
        return (
            <Flex w="full" align="center" justify="center">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (!isLoading && people.length === 0) {
        return (
            <Flex w="full" align="center" justify="center">
                <Text textAlign="center">No entries found. Add a new one!</Text>
            </Flex>
        );
    }

    if (isError) {
        return (
            <Flex w="full" align="center" justify="center">
                <Text textAlign="center">Error loading friends</Text>
            </Flex>
        );
    }

    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={4}
        >
            {people.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
            ))}
        </Grid>
    );
};

export default FriendsGrid;

import { Grid } from "@chakra-ui/react";
import React from "react";
import { dummyData } from "../dummyData/dummyData";
import FriendCard from "./FriendCard";

const FriendsGrid = () => {
    return (
        <Grid
            templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
            }}
            gap={4}
        >
            {dummyData.map((friend) => {
                return <FriendCard key={friend.id} friend={friend} />;
            })}
        </Grid>
    );
};

export default FriendsGrid;

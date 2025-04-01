import { Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import FriendsGrid from "./components/FriendsGrid";

function App() {
    return (
        <Stack minH={"100vh"}>
            <Navbar />

            <Container maxW={"1200px"} my={4}>
                <Text
                    fontWeight={"bold"}
                    letterSpacing={"2px"}
                    textAlign={"center"}
                    mb={8}
                    textTransform={"uppercase"}
                    fontSize={{ base: "xl", md: "32" }}
                >
                    Friends
                </Text>

                <FriendsGrid />
            </Container>
        </Stack>
    );
}

export default App;

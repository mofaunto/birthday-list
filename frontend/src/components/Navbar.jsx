import React from "react";
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import NewEntry from "./NewEntry";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"900px"}>
            <Box
                px={4}
                my={4}
                borderRadius={5}
                bg={useColorModeValue("gray.200", "gray.700")}
            >
                <Flex
                    h={"16"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {/* Left section */}
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={4}
                    >
                        <Heading as={"h2"} size="lg">
                            Birthdays
                        </Heading>
                    </Flex>

                    {/* Right section */}
                    <Flex alignItems={"center"} gap={2}>
                        <Text
                            fontSize={"lg"}
                            fontWeight={500}
                            display={{ base: "none", md: "block" }}
                            mr={4}
                        >
                            Never forget!
                        </Text>

                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? (
                                <IoMoon />
                            ) : (
                                <LuSun size={20} />
                            )}
                        </Button>

                        <NewEntry />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};

export default Navbar;

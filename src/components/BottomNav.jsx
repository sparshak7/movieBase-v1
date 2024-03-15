import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  return (
    <Box
      p="4"
      position="fixed"
      bottom="0"
      display={{ md: "none" }}
      left="0"
      right="0"
      zIndex="999"
      bg="#0d1117"
    >
      <Flex align="center" color="#fff" gap="4" justify="space-evenly">
        <Link
          to='/discover'
          zIndex="999"
        >
          <Text
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
            fontFamily="DM Sans"
            color={location.pathname === "/discover" && "red"}
          >
            Discover
          </Text>
        </Link>
        <Avatar size="sm" />
      </Flex>
    </Box>
  );
};

export default BottomNav;

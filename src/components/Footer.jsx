import {
  Badge,
  Box,
  Container,
  Divider,
  Flex,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { footerData } from "../utils/footerData";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Container maxW="container.xl">
      <Flex
        justify="center"
        align="center"
        gap="4"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <Text color="#fff" fontSize="large" fontFamily="DM Sans">
            Project Made Using:
          </Text>
        </Box>
        {footerData?.map((item, id) => (
          <Link key={item?.id} to={`${item?.link}`}>
            <Badge p="2" bg="gray.800" color="#fff" fontFamily="DM Sans">
              {item?.name}
            </Badge>
          </Link>
        ))}
      </Flex>
      <Flex justify="center" align="center" mt="6" direction="column" gap="6">
        <Text color="#fff" fontSize="large" fontFamily="DM Sans">
          Made with ❤️ by Sparshak Nag
        </Text>
        <Flex align="center" gap="8">
          <Tooltip label="Instagram">
            <Link to="https://www.instagram.com/exzeitgeist/" target="_blank">
              <FaInstagram
                style={{
                  fontSize: "28px",
                  color: "#fff",
                }}
              />
            </Link>
          </Tooltip>
          <Tooltip label="Github">
            <Link to="https://github.com/sparshak7" target="_blank">
              <FaGithub style={{ fontSize: "28px", color: "#fff" }} />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <Divider my="8" />
    </Container>
  );
};

export default Footer;

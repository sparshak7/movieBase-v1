import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdSportsCricket } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetSearchQuery } from "../redux/api";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const { data: searchResults, isLoading } = useGetSearchQuery(searchValue);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    setShowDropDown(e.target.value !== "");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Box
      py="4"
      mb="2"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      bg="transparent"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" p="2">
          <Flex align="center" gap="2" color="#fff">
            <Link to="/">
              <Heading fontSize={{ base: "xl", sm: "3xl" }}>
                Movie<span style={{ color: "#ef312f" }}>Base</span>
              </Heading>
            </Link>
          </Flex>
          <Box position="relative">
            <InputGroup
              size="lg"
              width={{ base: "120px", sm: "220px", md: "300px", lg: "400px" }}
            >
              <InputRightElement pointerEvents="none">
                <SearchIcon color="#d1d5db" size="1.5rem" />
              </InputRightElement>
              <Input
                type="text"
                placeholder="What do you want to search?"
                borderRadius="1rem"
                borderColor="#d1d5db"
                borderWidth="2px"
                _placeholder={{ color: "#d1d5db" }}
                color="#d1d5db"
                value={searchValue}
                onChange={handleChange}
              />
            </InputGroup>
            {showDropDown && (
              <VStack
                position="absolute"
                ref={dropdownRef}
                width={{ base: "120px", sm: "200px", md: "300px", lg: "400px" }}
                top="calc(100% + 4px)"
                bg="#0d1117"
                boxShadow="md"
                borderRadius="md"
                p="2"
                zIndex="9999"
                h="300px"
                color="#fff"
                gap="4"
                overflowY="scroll"
              >
                {searchResults?.results?.map((item) => (
                  <Link
                    to={`/details/${item?.media_type}/${item?.id}`}
                    onClick={() => setShowDropDown(false)}
                  >
                    <Text _hover={{ color: "red.500" }}>
                      {item?.name || item?.title} (
                      {new Date(
                        item?.release_date || item?.first_air_date
                      ).getFullYear()}
                      )
                    </Text>
                  </Link>
                ))}
              </VStack>
            )}
          </Box>
          <Flex align="center" color="#fff" gap="12">
            <Link to="/discover" zIndex="999">
              <Text fontSize="lg" fontFamily="DM Sans">
                Discover
              </Text>
            </Link>
            <Avatar size="sm" />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

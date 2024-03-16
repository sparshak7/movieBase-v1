import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuth } from "../context/useAuth";
import { ArrowUpIcon, SearchIcon } from "@chakra-ui/icons";

const BottomNav = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signout } = useAuth();
  const toast = useToast();

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/");
      toast({
        title: "Succesfully logged out.",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "There was an error logging out. Try again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <Link to="/discover" zIndex="999">
          <Text
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
            fontFamily="DM Sans"
            color={location.pathname === "/discover" && "red"}
          >
            Discover
          </Text>
        </Link>
        {showScrollTop && <SearchIcon fontSize="xl" onClick={handleClick} />}
        {user ? (
          <Menu>
            <MenuButton>
              <Avatar size="sm" name={user?.email} src={user?.photoURL} />
            </MenuButton>
            <MenuList bg="#0d1117" color="#fff">
              <Link to="/watchlist">
                <MenuItem
                  bg="#0d1117"
                  color="#fff"
                  _hover={{ color: "gray.400" }}
                >
                  Watchlist
                </MenuItem>
              </Link>
              <Link to="/favorites">
                <MenuItem
                  bg="#0d1117"
                  color="#fff"
                  _hover={{ color: "gray.400" }}
                >
                  Favourites
                </MenuItem>
              </Link>
              <MenuItem
                onClick={handleSignout}
                bg="#0d1117"
                color="#fff"
                _hover={{ color: "gray.400" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Link to="/login">
            <Button size="sm" colorScheme="red">
              Get Started
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default BottomNav;

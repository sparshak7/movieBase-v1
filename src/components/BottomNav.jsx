import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuth } from "../context/useAuth";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signInWithGoogle, signout } = useAuth();

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
          <Link to="/sign-in">
            <Avatar size="sm" />
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default BottomNav;

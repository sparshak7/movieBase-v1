import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetPopularQuery } from "../redux/api";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaGoogle } from "react-icons/fa";
import sign from "../assets/sign.jpg";
import { auth } from "../services/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setLoading(false);
      navigate("/");
      toast({
        title: "Succesfully logged in!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title:
          "Please write a valid email and a password of minimum 6 characters.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
    toast({
      title: "Succesfully logged in!",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  const disabled = formData.email === "" || formData.password === "";

  return (
    <Box
      background={`url(${sign})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100%"
      minH="100vh"
    >
      <Container maxW="container.sm">
        <Flex
          justify="center"
          align="center"
          direction="column"
          minH="100vh"
          gap="4"
          backdropFilter="blur(4px)"
        >
          <Heading fontFamily="DM Sans" color="#fff" mb="2">
            Welcome to Movie<span style={{ color: "red" }}>Base</span>
          </Heading>

          <Flex direction="column" gap="6" color="#fff" fontFamily="DM Sans">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter email"
              />
              <FormHelperText color="gray.400" fontStyle="italic">
                Your email is safe with us.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={handleChange}
                  id="password"
                />
                <InputRightElement>
                  <Box as="button" size="sm" onClick={() => setShow(!show)}>
                    {!show ? <ViewOffIcon /> : <ViewIcon />}
                  </Box>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="gray"
              type="submit"
              mt="2"
              isDisabled={disabled}
              onClick={handleClick}
              isLoading={loading}
            >
              Register
            </Button>
          </Flex>
          <Button
            colorScheme="red"
            mt="2"
            leftIcon={<FaGoogle />}
            onClick={signInWithGoogle}
          >
            Continue with Google
          </Button>
          <Flex color="#fff" gap="1">
            <Text fontFamily="DM Sans">Already have an account?</Text>
            <Link to="/login">
              <Text color="red" fontWeight="bold" fontFamily="DM Sans">
                Login.
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default SignIn;

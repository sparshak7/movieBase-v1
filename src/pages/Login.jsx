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
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
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
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setLoading(false);
      navigate("/");
      toast({
        title: "Succesfully logged in!",
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error.code);
      toast({
        title: "Check your email or password again.",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
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
            Login to Movie<span style={{ color: "red" }}>Base</span>
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
              Login
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
            <Text fontFamily="DM Sans">Don't have an account?</Text>
            <Link to="/sign-in">
              <Text color="red" fontWeight="bold" fontFamily="DM Sans">
                Register.
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Login;

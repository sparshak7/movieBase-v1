import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AddIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { MdFavorite } from "react-icons/md";
import { useGetPeopleDetailsQuery } from "../../redux/api";
import { colorProgress } from "../../utils/colorProgress";

const DescriptionPeople = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPeopleDetailsQuery(id);
  const [list, setList] = useState(false);
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  console.log(data);

  if (isLoading) {
    return (
      <Container maxW="container.xl">
        <Flex
          justify="center"
          h="100vh"
          w="100%"
          align="center"
          flexDirection="column"
          gap="8"
          p="2"
        >
          <Spinner size="xl" color="red" />
          <Text color="red.400" fontFamily="DM Sans" fontSize="md">
            If stuck in loading, please switch to WiFi connection and reload the
            page. The TMDB API used in this website can sometimes not work in
            local network for countries such as India, Russia, China etc.
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Box
      color="#fff"
      w="100%"
      h={{ base: "auto", md: "700px" }}
      display="flex"
      alignItems="center"
    >
      <Container maxW="container.xl" mt={{ base: "8rem", md: "" }}>
        <Flex
          align={{ base: "center", md: "center" }}
          gap={{ base: "12", md: "6", lg: "12" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Image
            h="450px"
            borderRadius="md"
            src={`${imgUrl}/${data?.profile_path}`}
            alt={data?.name}
          />
          <Box>
            <Flex
              align="center"
              gap={{ base: "6", md: "5", lg: "8" }}
              justify={{ base: "center", md: "initial" }}
            >
              <Heading
                fontSize={{ base: "xl", sm: "2xl", md: "2xl", lg: "3xl" }}
              >
                {data?.name} ({new Date(data?.birthday).getFullYear()}-
                {data?.deathday && `${new Date(data?.deathday).getFullYear()}`})
              </Heading>
            </Flex>
            <Text
              fontSize="sm"
              fontStyle="italic"
              my="4"
              color="gray.400"
              textAlign={{ base: "center", md: "initial" }}
            >
              Born in {data?.place_of_birth}
            </Text>
            <Flex justify={{ base: "center", md: "initial" }} mt="6">
              <Button
                leftIcon={list ? <CheckCircleIcon /> : <AddIcon />}
                bg={!list ? "red.800" : "green.800"}
                color="#fff"
                size="md"
                _hover={{ bg: !list ? "red.900" : "green.900" }}
                onClick={() => setList(!list)}
              >
                {list ? "Added to favourites!" : "Add to favourites?"}
              </Button>
            </Flex>
            <Text
              fontSize={{ base: "lg", md: "md" }}
              my="6"
              textAlign={{ base: "center", md: "initial" }}
              fontFamily="DM Sans"
              noOfLines={{ base: "", md: "12" }}
            >
              {data?.biography}
            </Text>
            {/* <Flex
              gap="2"
              my="4"
              justify={{ base: "center", md: "initial" }}
              align="center"
              flexDirection={{ base: "column", sm: "row" }}
            >
              {data?.genres?.map((item) => (
                <Badge key={item?.id} p="2" bg="gray.800" color="#fff">
                  {item?.name}
                </Badge>
              ))}
            </Flex> */}
          </Box>
        </Flex>
        <Divider my="8" />
      </Container>
    </Box>
  );
};

export default DescriptionPeople;

import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Container,
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
import { useGetDetailsQuery } from "../../redux/api";
import { colorProgress } from "../../utils/colorProgress";

const Description = () => {
  const { type, id } = useParams();
  const { data, isLoading } = useGetDetailsQuery({ type: type, id: id });
  const [list, setList] = useState(false);

  const [fav, setFav] = useState("#fff");
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  console.log(data);

  const handleClick = () => {
    if (fav === "#fff") setFav("red");
    else setFav("#fff");
  };

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
      mb="3rem"
      color="#fff"
      background={`linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${imgUrl}/${data?.backdrop_path})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100%"
      h={{ base: "auto", md: "700px" }}
      display="flex"
      zIndex="-1"
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
            src={`${imgUrl}/${data?.poster_path}`}
            alt={data?.name || data?.title}
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
                {data?.original_title || data?.original_name} (
                {new Date(
                  data?.release_date || data?.first_air_date
                ).getFullYear()}
                {/* {type === 'tv' && data?.in_production && "last_air_date" in data
                    ? "-"
                    : `-${new Date(data?.last_air_date).getFullYear()}`} */}
                )
              </Heading>
              <MdFavorite size="42px" color={fav} onClick={handleClick} />
            </Flex>
            <Text
              fontSize="sm"
              fontStyle="italic"
              my="4"
              color="gray.400"
              textAlign={{ base: "center", md: "initial" }}
            >
              {data?.tagline}
            </Text>
            {/* <Text
                fontSize="lg"
                fontStyle="bold"
                my="4"
                color="#fff"
                fontFamily="DM Sans"
                textTransform="uppercase"
              >
                {data?.created_by[0]?.name}
              </Text> */}
            <Flex
              align="center"
              gap="4"
              my="4"
              justify={{ base: "center", md: "initial" }}
            >
              <CircularProgress
                value={data?.vote_average?.toFixed(1) * 10}
                color={colorProgress(data?.vote_average)}
                borderRadius="full"
                size="60px"
                thickness="4px"
              >
                <CircularProgressLabel fontSize="lg">
                  {data?.vote_average?.toFixed(1) * 10}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
            <Flex justify={{ base: "center", md: "initial" }}>
              <Button
                leftIcon={list ? <CheckCircleIcon /> : <AddIcon />}
                bg={!list ? "red.800" : "green.800"}
                color="#fff"
                size="md"
                _hover={{ bg: !list ? "red.900" : "green.900" }}
                onClick={() => setList(!list)}
              >
                {list ? "Added to watchlist!" : "Add to watchlist?"}
              </Button>
            </Flex>
            <Text
              fontSize={{ base: "lg", md: "md" }}
              my="6"
              textAlign={{ base: "center", md: "initial" }}
            >
              {data?.overview}
            </Text>
            <Flex
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
            </Flex>
            {/* <Text
                fontSize="md"
                fontStyle="bold"
                my="4"
                color="#fff"
                textTransform="uppercase"
              >
                {data?.seasons?.length}{" "}
                {data?.seasons?.length > 1 ? "Seasons" : "Season"}
              </Text> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Description;

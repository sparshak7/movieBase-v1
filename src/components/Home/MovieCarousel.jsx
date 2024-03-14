import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTrendingTVQuery } from "../../redux/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StarIcon } from "@chakra-ui/icons";

const MovieCarousel = () => {
  const { data, isLoading } = useGetTrendingTVQuery();

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
            If stuck in loading, please switch to WiFi connection and reload the page. The TMDB API used in this website can sometimes not work in local network for countries such as India, Russia, China etc.
          </Text>
        </Flex>
      </Container>
    );
  }

  return (
    <Box mb="6">
      {data?.results?.length > 0 && (
        <Carousel
          autoPlay={true}
          interval={4000}
          showStatus={false}
          infiniteLoop={true}
          showIndicators={false}
          stopOnHover={true}
        >
          {data?.results?.map((movie) => (
            <Link
              to={`/details/${"original_title" in movie ? "movie" : "tv"}/${
                movie?.id
              }`}
            >
              <Box key={movie?.id} h={{ lg: "600px", md: "500px" }}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  m="auto"
                  display="block"
                  w="100%"
                  opacity="0.3"
                />
              </Box>
              <VStack
                p={{ lg: "4.5rem", md: "5rem", sm: "3rem", base: "2rem" }}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  height: "70%",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                  opacity: 1,
                  transition: "opacity .3s",
                }}
                _hover={{ opacity: 1 }}
              >
                <Heading
                  textAlign="left"
                  mb={{ lg: "0.5rem", md: "0.4rem", sm: "0.2rem" }}
                  fontWeight="500"
                  fontSize={{
                    lg: "48px",
                    md: "34px",
                    sm: "24px",
                    base: "16px",
                  }}
                  color="#fff"
                  fontFamily="DM Sans"
                >
                  {movie ? movie.original_title || movie.original_name : ""}
                </Heading>
                <HStack
                  mb={{ lg: "1rem", md: "0.8rem", sm: "0.6rem" }}
                  color="#fff"
                  spacing={12}
                >
                  <Text
                    fontSize={{
                      lg: "1.2rem",
                      md: "1.1rem",
                      sm: "0.9rem",
                      base: "0.7rem",
                    }}
                  >
                    {movie ? movie.release_date || movie.first_air_date : ""}
                  </Text>
                  <HStack spacing={2} align="center">
                    <StarIcon />
                    <Text
                      fontSize={{
                        lg: "1.2rem",
                        md: "1.1rem",
                        sm: "0.9rem",
                        base: "0.7rem",
                      }}
                    >
                      {movie ? `${movie.vote_average?.toFixed(2)}/10` : ""}
                    </Text>
                  </HStack>
                </HStack>
                <Flex
                  textAlign="left"
                  w={{ lg: "50%", md: "70%", sm: "90%", base: "100%" }}
                  color="white"
                  fontStyle="italic"
                  fontWeight="400"
                  display={{ base: "none", sm: "initial" }}
                  fontFamily="DM Sans"
                  fontSize={{
                    lg: "16px",
                    md: "14px",
                    sm: "12px",
                  }}
                  mb={{ lg: "1rem", md: "0.8rem", sm: "0.6rem" }}
                >
                  <Text>{movie ? movie.overview : ""}</Text>
                </Flex>
              </VStack>
            </Link>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default MovieCarousel;

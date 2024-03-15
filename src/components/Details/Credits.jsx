import React, { useEffect } from "react";
import { useGetCreditsQuery } from "../../redux/api";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Slide,
  Text,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Credits = () => {
  const { type, id } = useParams();
  const { data, isLoading } = useGetCreditsQuery({ type: type, id: id });
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <Container maxW="container.xl">
      <Heading
        fontSize={{ base: "3xl", md: "2xl", lg: "3xl" }}
        color="#fff"
        mb="6"
      >
        Cast
      </Heading>
      <Flex my="4" p="4" overflowX="scroll" gap="5">
        {data?.cast?.length === 0 ? (
          <Text fontSize="lg" color="#fff" textAlign="center">
            No cast available.
          </Text>
        ) : (
          data?.cast?.slice(0, 10).map((item) => (
            <Box color="#fff" minW="180px">
              <Link to={`/cast-details/${item?.id}`}>
                <Flex
                  direction="column"
                  gap="3"
                  key={item?.id}
                  minW="100px"
                  overflowX="scroll"
                >
                  <Image
                    src={`${imgUrl}/${item?.profile_path}`}
                    borderRadius="10px"
                    alt={item?.name}
                  />
                  <Text fontFamily="DM Sans">{item?.name}</Text>
                  <Text fontSize="sm" fontStyle="italic" color="gray.400">
                    {item?.character}
                  </Text>
                </Flex>
              </Link>
            </Box>
          ))
        )}
      </Flex>
      <Divider my="6" />
    </Container>
  );
};

export default Credits;

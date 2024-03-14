import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useGetCombinedCreditsQuery } from "../../redux/api";

import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import CardComponent2 from "../Home/CardComponent2";

const PeopleMovies = () => {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(4);
  const [filterType, setFilterType] = useState("movie");
  const { data, isLoading } = useGetCombinedCreditsQuery(id);
  const containerRef = useRef(null);
  const outRef = useRef(null);

  const inView = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const outView = () => {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    outRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleMore = () => {
    setShowMore((prev) => prev + 4);
    inView();
  };

  const handleLess = () => {
    setShowMore(4);
    outView();
  };

  if (isLoading) {
    return;
  }

  return (
    <Container maxW="container.xl" ref={outRef}>
      <Flex align="baseline" gap="4" justify="space-between">
        <Heading color="#fff" fontSize="2xl" mb="8">
          Work
        </Heading>
        <Flex
          align="center"
          gap="2"
          border="2px solid gray"
          borderRadius="20px"
          color="#fff"
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius="20px"
            bg={`${filterType === "movie" && "gray.500"}`}
            onClick={() => setFilterType("movie")}
          >
            Movie
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius="20px"
            bg={`${filterType === "tv" && "gray.500"}`}
            onClick={() => setFilterType("tv")}
          >
            TV Show
          </Box>
        </Flex>
      </Flex>
      {data?.cast?.length === 0 && (
        <Text fontSize="lg" color="#fff" textAlign="center">
          No {filterType === "movies" ? "movies" : "TV shows"} found.
        </Text>
      )}
      <Grid
        templateColumns={{
          base: "repeat(1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap="8"
      >
        {data?.cast &&
          data?.cast
            ?.filter((details) => details?.media_type === filterType)
            ?.slice(0, showMore)
            .map((item, id) => <CardComponent2 item={item} key={id} />)}
      </Grid>
      <Flex w="100%" justify="flex-end" mt="10" gap="4" ref={containerRef}>
        {showMore > 4 && (
          <Button
            onClick={handleLess}
            leftIcon={<ArrowUpIcon />}
            bg="red.800"
            _hover={{ bg: "red.900" }}
            color="#fff"
          >
            Show Less
          </Button>
        )}
        {data?.cast?.length > showMore && (
          <Button
            onClick={handleMore}
            leftIcon={<ArrowDownIcon />}
            bg="red.800"
            _hover={{ bg: "red.900" }}
            color="#fff"
          >
            Show More
          </Button>
        )}
      </Flex>
      <Divider my="6" />
    </Container>
  );
};

export default PeopleMovies;

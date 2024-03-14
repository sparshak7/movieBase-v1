import React, { useRef, useState } from "react";
import { useGetRecentQuery, useGetRecentTVQuery } from "../../redux/api";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import CardComponent from "./CardComponent";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const Recent = () => {
  const [choice, setChoice] = useState("movie");
  const [showMore, setShowMore] = useState(4);
  const containerRef = useRef(null);
  const outRef = useRef(null);

  const { data, isLoading } = useGetRecentQuery();
  const { data: recentTVData } = useGetRecentTVQuery();

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
        <Heading color="#fff" fontSize="2xl" mb="12">
          Upcoming/Recent
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
            bg={`${choice === "movie" && "gray.500"}`}
            onClick={() => setChoice("movie")}
          >
            Movie
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius="20px"
            bg={`${choice === "tv" && "gray.500"}`}
            onClick={() => setChoice("tv")}
          >
            TV Show
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(1fr)",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(4,1fr)",
        }}
        gap="8"
      >
        {choice === "movie"
          ? data?.results &&
            data?.results
              .slice(0, showMore)
              .map((item, id) => <CardComponent item={item} key={id} />)
          : recentTVData?.results &&
            recentTVData?.results
              .slice(0, showMore)
              .map((item, id) => <CardComponent item={item} key={id} />)}
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
        {data?.results?.length > showMore && (
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
      <Divider my="8" />
    </Container>
  );
};

export default Recent;

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
import { useGetRecommendedQuery } from "../../redux/api";

import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import CardComponent2 from "../Home/CardComponent2";

const Recommendation = () => {
  const { type, id } = useParams();
  const [showMore, setShowMore] = useState(4);
  const { data, isLoading } = useGetRecommendedQuery({ type: type, id: id });
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
    return (
      <Flex justify="center">
        <Spinner size="xl" color="red" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" ref={outRef}>
      <Heading color="#fff" fontSize="2xl" mb="8">
        Recommended
      </Heading>
      {data?.results?.length === 0 && (
        <Text fontSize="lg" color="#fff" textAlign="center">
          No recommended movies found.
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
        {data?.results &&
          data?.results
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
      <Divider my="6" />
    </Container>
  );
};

export default Recommendation;

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
import React, { useRef, useState } from "react";
import { useGetPopularQuery } from "../../redux/api";
import CardComponent2 from "./CardComponent2";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const Popular = () => {
  const [choice, setChoice] = useState("movie");
  const [showMore, setShowMore] = useState(4);
  const { data: popularData, isLoading } = useGetPopularQuery(choice);
  const containerRef = useRef(null);
  const outRef = useRef(null);

  const inView = () => {
    containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const outView = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // outRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
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
          Popular 🔥
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
        {popularData?.results &&
          popularData?.results
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
        {popularData?.results?.length > showMore && (
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

export default Popular;

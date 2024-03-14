import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Select,
  Spinner,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useGetDiscoverQuery } from "../redux/api";
import CardComponent2 from "../components/Home/CardComponent2";
import Pagination from "../components/Pagination";

const Discover = () => {
  const [type, setType] = useState("movie");
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const { data, isLoading } = useGetDiscoverQuery({
    type: type,
    page: page,
    sortBy: sortBy,
  });

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

  console.log(data);
  return (
    <Box mt="8rem">
      <Container maxW="container.xl">
        <Flex
          align="baseline"
          gap="4"
          justify="space-between"
          ref={containerRef}
        >
          <Heading color="#fff" fontSize="2xl" mb="12">
            Discover
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
              bg={`${type === "movie" && "gray.500"}`}
              onClick={() => {
                setPage(1);
                setType("movie");
              }}
            >
              Movie
            </Box>
            <Box
              as="button"
              px="3"
              py="1"
              borderRadius="20px"
              bg={`${type === "tv" && "gray.500"}`}
              onClick={() => {
                setPage(1);
                setType("tv");
              }}
            >
              TV Show
            </Box>
          </Flex>
        </Flex>
        <Flex justify="flex-end">
          <Select
            w="200px"
            mb="10"
            zIndex="999"
            onChange={(e) => setSortBy(e.target.value)}
            color="#fff"
          >
            <option value="popularity.desc" style={{ color: "#333" }}>
              Popularity
            </option>
            <option
              value="vote_average.desc&vote_count.gte=1000"
              style={{ color: "#333" }}
            >
              Rating
            </option>
          </Select>
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
          {data?.results &&
            data?.results?.map((item, id) => (
              <CardComponent2 item={item} key={id} />
            ))}
        </Grid>
        <Pagination
          page={page}
          totalPage={data?.total_pages}
          setPage={setPage}
        />
        <Divider my="8" />
      </Container>
    </Box>
  );
};

export default Discover;

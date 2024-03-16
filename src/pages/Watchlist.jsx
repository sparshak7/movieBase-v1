import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/useAuth";
import { useFireStore } from "../services/firestore";
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
import ListCard from "../components/ListCard";
import { Link } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import Scroller from "../components/Scroller";

const Watchlist = () => {
  const { getWatchList } = useFireStore();
  const { user } = useAuth();

  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      getWatchList(user?.uid)
        .then((data) => {
          setWatchlist(data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.id, getWatchList]);

  if (loading) {
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
    <>
      <Navbar />
      <Scroller />
      <BottomNav />
      <Container maxW="container.xl" mt="8rem" mb="4rem">
        <Flex align="baseline" gap="4" justify="space-between">
          <Heading color="#fff" fontSize="2xl" mb="12">
            Watchlist
          </Heading>
        </Flex>
        {loading && watchlist?.length === 0 && (
          <Flex justify="center" mt="8">
            <Text color="#fff" fontSize="md">
              Watchlist
            </Text>
          </Flex>
        )}
        {!loading && watchlist?.length === 0 && (
          <Flex
            justify="center"
            mt="8"
            direction="column"
            gap="4"
            align="center"
          >
            <Text color="#fff" fontSize="md" fontFamily="DM Sans">
              Your watchlist is empty.
            </Text>
            <Box display={{ base: "none", md: "block" }}>
              <Link to="/discover">
                <Button
                  size="md"
                  colorScheme="teal"
                  leftIcon={<MdOutlineExplore />}
                >
                  Start Exploring
                </Button>
              </Link>
            </Box>
          </Flex>
        )}
        {!loading && watchlist?.length > 0 && (
          <Grid templateColumns={{ base: "1fr" }} gap="6">
            {watchlist?.map((item) => (
              <ListCard
                key={item?.id}
                item={item}
                type={item?.type}
                setWatchlist={setWatchlist}
              />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Watchlist;

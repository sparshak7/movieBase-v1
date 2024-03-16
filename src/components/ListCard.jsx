import React from "react";
import { useFireStore } from "../services/firestore";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";

const ListCard = ({ type, item, setWatchlist }) => {
  const { removeWatchlist } = useFireStore();
  const { user } = useAuth();
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const handleRemoveClick = (e) => {
    e.preventDefault();
    removeWatchlist(user?.uid, item?.id).then(() => {
      setWatchlist((prev) => prev.filter((idx) => idx.id !== item.id));
    });
  };

  return (
    <Link to={`/details/${type}/${item?.id}`}>
      <Flex gap="4" _hover={{ md: { bg: "gray.900" } }} p="2">
        <Box w="150px">
          <Image
            src={`${imgUrl}/${item?.poster_path}`}
            alt={item?.title || item?.name}
            height="200px"
            minW="150px"
            objectFit="cover"
            borderRadius="20px"
          />
        </Box>
        <Box>
          <Heading
            fontSize={{ base: "xl", md: "2xl" }}
            noOfLines="1"
            color="#fff"
            fontFamily="DM Sans"
          >
            {item?.title || item?.name} (
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || "N/A"}
            )
          </Heading>
          <Flex alignItems="center" gap="2" mt="4" color="#fff">
            <Tooltip label="Remove from watchlist">
              <IconButton
                aria-label="Remove from watchlist"
                icon={<DeleteIcon />}
                size="sm"
                zIndex="999"
                colorScheme="red"
                onClick={handleRemoveClick}
              />
            </Tooltip>
          </Flex>
          <Text
            mt="4"
            fontSize={{ base: "xs", md: "sm" }}
            noOfLines="5"
            color="#fff"
          >
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default ListCard;

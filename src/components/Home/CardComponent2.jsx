import {
  Box,
  Image,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colorProgress } from "../../utils/colorProgress";

const CardComponent2 = ({ item }) => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const type = "original_title" in item ? "movie" : "tv";

  return (
    <Link to={`/details/${type}/${item?.id}`}>
      <Box
        position="relative"
        transform="scale(1)"
        zIndex="10"
        _hover={{
          transform: { base: "scale(1)", md: "scale(1.08)" },
          transition: "transform 0.2s ease-in-out",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${imgUrl}/${item?.poster_path}`}
          alt={item?.title || item?.name}
        />
        <Box
          position="absolute"
          className="overlay"
          bottom="0"
          left="0"
          color="#fff"
          w="100%"
          h="100%"
          backdropFilter="blur(0.5px)"
          bg="rgba(0,0,0,0.6)"
          opacity={{ base: 1, md: 0 }}
          transition="opacity 0.3s ease-in-out"
          display="flex"
          flexDirection="column"
          align="center"
          justifyContent="space-around"
          zIndex="99"
          gap="2"
        >
          <Box>
            <Text textAlign="center">{item?.title || item?.name}</Text>
            <Text textAlign="center">
              (
              {new Date(
                item?.release_date || item?.first_air_date
              ).getFullYear() || "N/A"}
              )
            </Text>
          </Box>
          <CircularProgress
            value={item?.vote_average?.toFixed(1) * 10}
            color={colorProgress(item?.vote_average.toFixed(1))}
          >
            <CircularProgressLabel fontSize="14px">
              {item?.vote_average.toFixed(1) * 10}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Box>
    </Link>
  );
};

export default CardComponent2;

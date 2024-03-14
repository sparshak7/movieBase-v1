import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../../redux/api";
import VideoPlayer from "../VideoPlayer";
import { Box, Container, Divider, Flex, Heading, Text } from "@chakra-ui/react";

const Videos = () => {
  const { type, id } = useParams();
  const { data, isLoading } = useGetVideosQuery({ type: type, id: id });

  return (
    <Container maxW="container.xl" pb="10">
      <Heading mb="10" color="#fff">
        Videos
      </Heading>
      {data?.results?.length === 0 ? (
        <Text color="#fff" fontSize="large" textAlign="center">
          No videos found.
        </Text>
      ) : (
        <>
          <VideoPlayer
            id={
              data?.results?.filter((video) => video?.type === "Trailer")[0].key
            }
          />
          <Flex
            mt="8"
            mb="10"
            overflowX="scroll"
            gap="6"
            align="center"
            justify="space-between"
          >
            {data &&
              data?.results
                ?.filter((video) => video?.type !== "Trailer")
                ?.slice(0, 10)
                .map((item) => (
                  <Box key={item?.id} minW="290px" my="6">
                    <VideoPlayer id={item?.key} size />
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      mt="4"
                      noOfLines="2"
                      color="#fff"
                    >
                      {item?.name}
                    </Text>
                  </Box>
                ))}
          </Flex>{" "}
        </>
      )}
      <Divider my="8" />
    </Container>
  );
};

export default Videos;

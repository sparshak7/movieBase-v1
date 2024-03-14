import React from "react";
import DescriptionPeople from "../components/People/DescriptionPeople";
import { Box } from "@chakra-ui/react";
import PeopleMovies from "../components/People/PeopleMovies";

const PeopleDetails = () => {
  return (
    <Box>
      <DescriptionPeople />
      <PeopleMovies />
    </Box>
  );
};

export default PeopleDetails;

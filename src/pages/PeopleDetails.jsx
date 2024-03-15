import React from "react";
import DescriptionPeople from "../components/People/DescriptionPeople";
import { Box } from "@chakra-ui/react";
import PeopleMovies from "../components/People/PeopleMovies";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const PeopleDetails = () => {
  return (
    <Box>
      <Navbar />
      <BottomNav />
      <DescriptionPeople />
      <PeopleMovies />
    </Box>
  );
};

export default PeopleDetails;

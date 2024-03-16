import React from "react";
import DescriptionPeople from "../components/People/DescriptionPeople";
import { Box } from "@chakra-ui/react";
import PeopleMovies from "../components/People/PeopleMovies";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import Scroller from "../components/Scroller";

const PeopleDetails = () => {
  return (
    <Box>
      <Scroller />
      <Navbar />
      <BottomNav />
      <DescriptionPeople />
      <PeopleMovies />
    </Box>
  );
};

export default PeopleDetails;

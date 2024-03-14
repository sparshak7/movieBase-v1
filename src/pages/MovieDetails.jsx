import {
  Box
} from "@chakra-ui/react";
import Description from "../components/Details/Description";
import Credits from "../components/Details/Credits";
import Recommendation from "../components/Details/Recommendation";
import { useEffect } from "react";
import Videos from "../components/Details/Videos";
import Footer from "../components/Footer";

const MovieDetails = () => {
  return (
    <Box>
      <Description />
      <Credits />
      <Videos />
      <Recommendation />
      <Footer />
    </Box>
  );
};

export default MovieDetails;

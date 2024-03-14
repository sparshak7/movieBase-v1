import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import Popular from "../components/Home/Popular";
import Recent from "../components/Home/Recent";
import MovieCarousel from "../components/Home/MovieCarousel";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Box>
      <MovieCarousel />
      <Popular />
      <Recent />
      <Footer />
    </Box>
  );
};

export default Home;

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
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Home = () => {
  return (
    <Box>
      <Navbar />
      <BottomNav />
      <MovieCarousel />
      <Popular />
      <Recent />
      <Footer />
    </Box>
  );
};

export default Home;

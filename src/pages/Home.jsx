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
      {/* <Container maxW="container.xl">
        <Flex align="center" justify="space-between" mb="8">
          <Heading color="#fff" fontSize="2xl">
            Hall of Fame
          </Heading>
          <Select
            variant="outline"
            width={{ base: "30%", md: "20%" }}
            color="#d1d5db"
            zIndex="20"
            onChange={handleChange}
          >
            <option value="2024" style={{ color: "#333" }}>
              Default (2024)
            </option>
            <option value="2023" style={{ color: "#333" }}>
              2023
            </option>
            <option value="2022" style={{ color: "#333" }}>
              2022
            </option>
            <option value="2021" style={{ color: "#333" }}>
              2021
            </option>
            <option value="2020" style={{ color: "#333" }}>
              2020
            </option>
            <option value="2019" style={{ color: "#333" }}>
              2019
            </option>
            <option value="2018" style={{ color: "#333" }}>
              2018
            </option>
            <option value="2017" style={{ color: "#333" }}>
              2017
            </option>
            <option value="2016" style={{ color: "#333" }}>
              2016
            </option>
          </Select>
        </Flex>
        {isLoading ? (
          <Spinner color="red.500" />
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1fr)",
              sm: "repeat(2,1fr)",
              md: "repeat(3,1fr)",
              lg: "repeat(4,1fr)",
            }}
            gap="8"
          >
            {fameData &&
              fameData?.map((item, id) => (
                <CardComponent item={item} key={id} />
              ))}
          </Grid>
        )}
        <Divider my="8" />
      </Container> */}
    </Box>
  );
};

export default Home;

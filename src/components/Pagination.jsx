import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ page, totalPage, setPage }) => {
  const handleNext = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setPage(page - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box mt="12">
      <Flex gap="4" align="center" justify="flex-end">
        <Button
          bg="red.800"
          _hover={{ bg: "red.900" }}
          color="#fff"
          isDisabled={page === 1}
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          bg="red.800"
          _hover={{ bg: "red.900" }}
          color="#fff"
          onClick={handleNext}
          isDisabled={page === totalPage}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Pagination;

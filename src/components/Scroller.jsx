import React, { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const Scroller = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  return (
    <>
      {showScrollTop && (
        <Box
          position="fixed"
          bottom="10px"
          right="10px"
          w="60px"
          h="60px"
          bg="gray.700"
          display={{ base: "none", md: "flex" }}
          zIndex="9999"
          alignItems="center"
          justifyContent="center"
          borderRadius="50%"
          opacity={showScrollTop ? 1 : 0}
          transition="opacity 0.3s ease-in-out"
          pointerEvents={showScrollTop ? "auto" : "none"}
        >
          <ArrowUpIcon
            color="#fff"
            fontSize="2xl"
            onClick={handleClick}
            cursor="pointer"
          />
        </Box>
      )}
    </>
  );
};

export default Scroller;

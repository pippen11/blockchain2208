import { Box, Flex, Spacer } from "@chakra-ui/react";

import type { NextPage } from "next";

import ItemCard from "../components/Items";

const Home: NextPage = () => {
  return (
    <>
      <Flex p="20">
        <Box>
          <ItemCard itemNum={"1"} />
        </Box>
        <Spacer />
        <Box>
          <ItemCard itemNum={"2"} />
        </Box>
        <Spacer />
        <Box>
          <ItemCard itemNum={"3"} />
        </Box>
      </Flex>

      <Flex p="20">
        <Box>
          <ItemCard itemNum={"4"} />
        </Box>
        <Spacer />
        <Box>
          <ItemCard itemNum={"5"} />
        </Box>
        <Spacer />
        <Box>
          <ItemCard itemNum={"6"} />
        </Box>
      </Flex>
    </>
  );
};

export default Home;

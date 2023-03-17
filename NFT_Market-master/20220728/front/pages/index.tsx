import {
  Box,
  Button,
  Flex,
  useAccordion,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import MintingModal from "../components/MintingModal";
import useAccount from "../hooks/useAccount";
import useWeb3 from "../hooks/useWeb3";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account } = useAccount();
  const { web3, ingToken, saleToken } = useWeb3();

  useEffect(() => {
    console.log(account);
    console.log(web3);
    console.log(ingToken);
    console.log(saleToken);
  });

  return (
    <>
      <Flex
        bg="red.100"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Button colorScheme="blue" onClick={onOpen}>
          민팅하기
        </Button>
      </Flex>
      <MintingModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Home;

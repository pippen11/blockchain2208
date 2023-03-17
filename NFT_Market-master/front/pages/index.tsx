import {
    Box,
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
    useAccordion,
    useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import useWeb3 from "../hooks/useWeb3";
import MintingModal from "./components/mintingModal";

const Home: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account } = useAccount();
    const { web3, gyulToken, saleToken } = useWeb3();

    const [remain, setRemain] = useState<number>(0);
    const [tokenTable, setTokenTable] = useState<string[][] | undefined>(undefined);

    const getTokenTable = async () => {
        try {
            if (!gyulToken) return;

            const response = await gyulToken.methods.getTokenCount().call();
            console.log(response);
            setTokenTable(response);
        } catch (e) {
            console.error(e);
        }
    };

    const getRemain = async () => {
        try {
            if (!gyulToken) return;

            const [totalSupply, MAX_TOKEN_COUNT] = await Promise.all([
                await gyulToken.methods.totalSupply().call(),
                await gyulToken.methods.MAX_TOKEN_COUNT().call(),
            ]);

            setRemain(parseInt(MAX_TOKEN_COUNT) - parseInt(totalSupply));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        console.log(account);
        console.log(web3);
        console.log(gyulToken);
        console.log(saleToken);

        getRemain();
        getTokenTable();
    }, [gyulToken]);
    return (
        <>
            <Flex bg="red.100" minH="100vh" justifyContent="center" alignItems="center" direction="column">
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Rank/Type</Td>
                                <Td>1</Td>
                                <Td>2</Td>
                                <Td>3</Td>
                                <Td>4</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tokenTable?.map((v, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        {v.map((j, w) => {
                                            return <Td key={w}>{j}</Td>;
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Text>남은 NFT 개수 : {remain}</Text>
                <Button colorScheme="blue" onClick={onOpen}>
                    민팅하기
                </Button>
            </Flex>
            <MintingModal isOpen={isOpen} onClose={onClose} getRemain={getRemain} getTokenTable={getTokenTable} />
        </>
    );
};

export default Home;

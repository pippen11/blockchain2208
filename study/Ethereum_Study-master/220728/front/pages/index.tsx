import type { NextPage } from 'next';
import { Box, Button, Flex, useDisclosure, Text, TableContainer, Table, Thead, Tr, Td, Tbody } from '@chakra-ui/react';
import MintingModal from '../components/MintingModal';
import useAccount from '../hooks/useAccount';
import useWeb3 from '../hooks/useWeb3';
import { useEffect, useState } from 'react';
// Box == div , Flex == flex 들어간 div

const Home: NextPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // modal창 커스텀 훅
    const { account } = useAccount();
    const { web3, jwToken, saleToken } = useWeb3();
    const [remain, setRemain] = useState<number>(0);
    const [tokenTable, setTokenTable] = useState<string[][] | undefined>(undefined);

    const getTokenTable = async () => {
        try {
            if (!jwToken) return;

            const response = await jwToken.methods.getTokenCount().call();
            console.log(response);
            setTokenTable(response);
        } catch (e) {
            console.error(e);
        }
    };

    const getRemain = async () => {
        try {
            if (!jwToken) return;

            // await jwToken.methods.totalSupply().call(); // 4초
            // await jwToken.methods.MAX_TOKEN_COUNT().call(); // 5초
            // // 총 9초

            // Promise.all => 총 5초
            const [totalSupply, MAX_TOKEN_COUNT] = await Promise.all([
                jwToken.methods.totalSupply().call(),
                jwToken.methods.MAX_TOKEN_COUNT().call(),
            ]);

            setRemain(parseInt(MAX_TOKEN_COUNT) - parseInt(totalSupply));
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getRemain();
        getTokenTable();
    }, [jwToken]);

    return (
        <>
            <Flex bg="red.100" minH="100vh" justifyContent="center" alignItems="center" direction="column">
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Td>Rank / Type</Td>
                                <Td>1</Td>
                                <Td>2</Td>
                                <Td>3</Td>
                                <Td>4</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* 2차 배열 값 표현하기 */}
                            {/* 첫번째 Td는 Rank */}
                            {tokenTable?.map((v, i) => {
                                return (
                                    <Tr key={i}>
                                        <Td>{i + 1}</Td>
                                        {v.map((_v, _i) => {
                                            return <Td key={_i}>{_v}</Td>;
                                        })}
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Text mb={4}>남은 NFT 갯수 : {remain}</Text>
                <Button colorScheme="blue" onClick={onOpen}>
                    민팅하기
                </Button>
            </Flex>
            <MintingModal isOpen={isOpen} onClose={onClose} getRemain={getRemain} getTokenTable={getTokenTable} />
        </>
    );
};

export default Home;

/*
  Chakra-ui css
  bg : background
  minH : min height
*/

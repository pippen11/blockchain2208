// http://localhost:3000/myPage
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import MyTokenCard from '../components/MyTokenCard';
import useAccount from '../hooks/useAccount';
import useWeb3 from '../hooks/useWeb3';
import TokenData from '../interface/tokendata.interface';

const MyPage: FC = () => {
    const [approveStatus, setApproveStatus] = useState<boolean>(false);
    const [myTokens, setMyTokens] = useState<TokenData[] | undefined>(undefined);
    const { account } = useAccount();
    const { jwToken, saleToken } = useWeb3();

    const getApproveStatus = async () => {
        try {
            if (!account || !jwToken || !saleToken) return;

            // isApprovedForAll() 인자값 2개 (owner, operator)
            // owner : 메타마스크에 로그인한 사람의 account , operater : 판매 컨트랙트 CA
            const response = await jwToken.methods.isApprovedForAll(account, (saleToken as any)._address).call();

            setApproveStatus(response);
        } catch (e) {
            console.error(e);
        }
    };

    const getMyTokens = async () => {
        try {
            if (!account || !saleToken) return;

            // 인자값 tokenOwner
            const response = await saleToken.methods.getOwnerTokens(account).call();
            console.log(response);
            setMyTokens(response);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClick = async () => {
        try {
            if (!account || !jwToken || !saleToken) return;

            // 첫번째 인자값 : operator , 두번째 인자값 : msg.sener == owner
            const response = await jwToken.methods.setApprovalForAll((saleToken as any)._address, !approveStatus).send({
                from: account,
            });

            if (response.status) {
                // 상태변경 함수에 콜백함수를 넣을 수 있다. 콜백함수의 첫번째 인자값은 기존 상태값
                setApproveStatus((prev) => !prev);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getApproveStatus();
        getMyTokens();
    }, [account, jwToken, saleToken]);

    // myTokens [{}, {}, {}, ...]
    return (
        <>
            <Box py="12" px="12" bg="blue.100" minH="100vh">
                <Box py={4} textAlign="center">
                    <Text>Approved : {approveStatus ? 'TRUE' : 'FALSE'}</Text>
                    <Button size="xs" ml="2" colorScheme={approveStatus ? 'red' : 'green'} onClick={handleClick}>
                        {approveStatus ? 'Cancel' : 'Approve'}
                    </Button>
                </Box>
                MyPage
                <Flex wrap="wrap" justifyContent="space-between">
                    {myTokens?.map((v) => {
                        return <MyTokenCard key={v.tokenId} TokenData={v} />;
                    })}
                </Flex>
            </Box>
        </>
    );
};
export default MyPage;

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import useAccount from "../hooks/useAccount";
import useWeb3 from "../hooks/useWeb3";
import TokenData from "../interface/tokendata.interface";
import MyTokenCard from "./components/MyTokenCard";

const Mypage: FC = () => {
    const [approveStatus, setApproveStatus] = useState<boolean>(false);
    const [myTokens, setMyTokens] = useState<TokenData[] | undefined>(undefined);
    const { account } = useAccount();
    const { gyulToken, saleToken } = useWeb3();

    const getApproveStatus = async () => {
        try {
            if (!account || !gyulToken || !saleToken) return;
            const response = await gyulToken.methods.isApprovedForAll(account, (saleToken as any)._address).call();

            setApproveStatus(response);
        } catch (e) {
            console.error(e);
        }
    };

    const getMyTokens = async () => {
        try {
            if (!account || !saleToken) return;

            const response = await saleToken.methods.getOwnerTokens(account).call();
            setMyTokens(response);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClick = async () => {
        try {
            if (!account || !gyulToken || !saleToken) return;
            const response = await gyulToken.methods
                .setApprovalForAll((saleToken as any)._address, !approveStatus)
                .send({
                    from: account,
                });

            if (response.status) {
                setApproveStatus((prev) => !prev);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getApproveStatus();
        getMyTokens();
    }, [account, gyulToken, saleToken]);

    return (
        <>
            <Box py="12" px="12" bg="blue.100" minH="100vh">
                <Box py="4" textAlign="center">
                    <Text>Approved : {approveStatus ? "True" : "False"}</Text>
                    <Button size="xs" ml="2" colorScheme={approveStatus ? "red" : "green"} onClick={handleClick}>
                        {approveStatus ? "취소" : "승인"}
                    </Button>
                </Box>
                MyPage
                <Flex wrap="wrap" justifyContent="space-between">
                    {myTokens?.map((v) => (
                        <MyTokenCard key={v.tokenId} TokenData={v} />
                    ))}
                </Flex>
            </Box>
        </>
    );
};

export default Mypage;

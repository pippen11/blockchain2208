import { Box, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useMetaData } from "../../hooks/useMetaData";
import TokenData from "../../interface/tokendata.interface";
import SaleInput from "./SaleInput";
import TokenCard from "./TokenCard";

interface MyTokenCardProps {
    TokenData: TokenData;
}

const MyTokenCard: FC<MyTokenCardProps> = ({ TokenData }) => {
    const { metadata, getMetadata } = useMetaData();
    const [tokenPrice, setTokenPrice] = useState<string>(TokenData.price);

    useEffect(() => {
        getMetadata(TokenData.tokenId);
    }, []);
    return (
        <>
            <Box>
                <TokenCard metadata={metadata} />
                {tokenPrice === "0" ? (
                    <SaleInput tokenId={TokenData.tokenId} setTokenPrice={setTokenPrice} />
                ) : (
                    <Text>판매 중 : {parseInt(tokenPrice) / 10 ** 18} ETH</Text>
                )}
            </Box>
        </>
    );
};

export default MyTokenCard;

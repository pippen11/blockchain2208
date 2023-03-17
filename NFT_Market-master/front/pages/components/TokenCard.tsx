import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import TokenMetaData from "../../interface/tokenMetaData";

interface TokenCardProps {
    metadata: TokenMetaData | undefined;
}
const TokenCard: FC<TokenCardProps> = ({ metadata }) => {
    return (
        <Box w="200">
            <Image src={metadata?.image} />
            <Text>{metadata?.name}</Text>
            <Text>{metadata?.description}</Text>
        </Box>
    );
};

export default TokenCard;

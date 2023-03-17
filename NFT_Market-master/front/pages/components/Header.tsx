import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import useAccount from "../../hooks/useAccount";

const Header: FC = () => {
    const { account } = useAccount();
    return (
        <Flex position="fixed" w="full" bg="white" justifyContent="space-between" px="12" py="2">
            <Box>Logo</Box>
            <Box>
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        Home
                    </Button>
                </Link>
                <Link href="/mypage">
                    <Button size="sm" variant="ghost">
                        My NFT
                    </Button>
                </Link>
            </Box>
            <Box>Account:{account}</Box>
        </Flex>
    );
};
export default Header;

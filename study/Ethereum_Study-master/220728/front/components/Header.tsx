import { Box, Button, Flex } from '@chakra-ui/react';
import Link from 'next/link'; // <a> 태그 같은 기능
import { FC } from 'react';
import useAccount from '../hooks/useAccount';

const Header: FC = () => {
    const { account } = useAccount();

    return (
        <Flex position="fixed" justifyContent="space-between" px="12" py="2" w="full" bg="white">
            <Box>Logo</Box>
            <Box>
                <Link href="/">
                    <Button size="sm" variant="ghost">
                        Home
                    </Button>
                </Link>
                <Link href="/mypage">
                    <Button size="sm" variant="ghost">
                        나의 NFT
                    </Button>
                </Link>
            </Box>
            <Box>Account : {account}</Box>
        </Flex>
    );
};

export default Header;

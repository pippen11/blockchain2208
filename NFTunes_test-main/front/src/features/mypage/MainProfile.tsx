import { useAppSelector } from '../../hooks/exhook';
import { userState } from '../user/userSlice';
import {
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import Subscribe from '../subscribe/SubscribeModal';

const MainProfile = () => {
  const user = useAppSelector(userState);
  return (
    <>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Flex w="70px" cursor="pointer" justify="space-between" align="center">
            <img
              className="w-10 h-10 rounded-full flex"
              src={
                user.userInfo.avatar === ''
                  ? 'https://nft-unes-test-be.vercel.app/upload/user.png'
                  : user.userInfo.avatar
              }
            />
          </Flex>
        </PopoverTrigger>
        <Portal>
          <PopoverContent
            w="200px"
            bgColor="rgb( 10 10 10 / 0.9)"
            color="white"
            borderColor="white"
            ringColor="black"
            overflow="hidden"
          >
            <PopoverArrow />
            <PopoverHeader className="font-bold">
              {user.userInfo.nickname === '' ? 'Guest' : user.userInfo.nickname}
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody className="hover:bg-emerald-900">
              <Link href={`/mypage/${user.userInfo.account}`}>
                <span className="cursor-pointer">Dash board</span>
              </Link>
            </PopoverBody>
            <PopoverBody className="hover:bg-emerald-900">
              <Link href={`/mypage/uploadmusic`}>
                <span className="cursor-pointer">Upload Music</span>
              </Link>
            </PopoverBody>
            <PopoverFooter>
              <Subscribe />
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default MainProfile;

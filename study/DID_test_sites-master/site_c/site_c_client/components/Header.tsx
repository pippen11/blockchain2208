import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Global } from "../pages/_app";
import Router from "next/router";
import { useCookies } from "react-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const { isLogin, setIsLogin, setUserToken, userData, setUserData } =
    useContext(Global);
  const [, setCookie, removeCookie] = useCookies();

  // const logout = async () => {
  //   removeCookie("CHANNEL_Token");
  //   // deleteCookie("DID_ACCESS_TOKEN");
  //   // deleteCookie("DID_REFRESH_TOKEN");
  //   // const response = await axios.get("http://localhost:4001/api/user/logout");

  //   if (
  //     setIsLogin === undefined ||
  //     setUserToken === undefined ||
  //     setUserData === undefined
  //   )
  //     return;
  //   setUserToken("");
  //   setIsLogin(false);
  //   setUserData({});
  //   alert("로그아웃 되었습니다.");
  //   Router.push("/");
  // };

  const getPoint = async () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    if (setUserToken === undefined) return;
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4003/api/user/getPoint",
        {
          userData,
        }
      );
      const { error, updateCheck, token } = response.data;
      if (!error && updateCheck) {
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(error);
      alert(
        "포인트 지급이 정상적으로 처리되지 않았습니다. 잠시후 다시 이용해주세요."
      );
    }
  };

  const withdrawDID = async () => {
    if (
      setUserToken === undefined ||
      setUserData === undefined ||
      setIsLogin === undefined
    )
      return;

    try {
      const response = await axios.post(
        "http://localhost:4003/api/user/withdrawDID",
        {
          userData,
        }
      );

      const { error, withdrawDIDchk, withdrawUser, token } = response.data;
      if (!error && withdrawDIDchk) {
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
        alert("DID 인증이 철회되었습니다.");
        window.location.href = "http://localhost:4003/api/user/logout";
      }
      if (!error && withdrawUser) {
        setIsLogin(false);
        removeCookie("CHANNEL_Token");
        setUserToken("");
        setUserData({});
        alert("DID 로그인 인증이 철회되었습니다.");
        window.location.href = "http://localhost:4003/api/user/logout";
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log(error);
      alert(
        "DID 인증 철회가 정상적으로 처리되지 않았습니다. 다시 시도해주세요. "
      );
    }
  };

  return (
    <>
      <Box h="100px">
        <Box
          mt="1.5%"
          display="inline-block"
          position="absolute"
          transform="translateX(-50%)"
          left="50%"
        >
          <Heading cursor="pointer" as="h1" size="4xl">
            <Link href="/">THE 여행사</Link>
          </Heading>
        </Box>

        <ButtonGroup gap="2" mr="3%" float="right" mt="3%">
          {!isLogin ? (
            <>
              <LoginModal />
              <Link href="/regist">
                <Button colorScheme="blackAlpha">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              {/* {userData?.point !== undefined && (
                <span>내 포인트 : {point}</span>
              )} */}
              <Flex direction="column">
                <Text>내 포인트 : {userData?.point}</Text>
                {userData?.userCode !== "" && (
                  <>
                    <Text fontWeight="extrabold" color="#319795">
                      DID 인증 완료
                    </Text>
                  </>
                )}
              </Flex>

              <form method="get" action="http://localhost:4003/api/user/logout">
                <Button colorScheme="blackAlpha" type="submit">
                  Logout
                </Button>
              </form>
              {/* <Button colorScheme="blackAlpha" onClick={logout}>
                Logout
              </Button> */}

              {userData?.userCode !== "" && (
                <Button colorScheme="red" onClick={withdrawDID}>
                  인증 철회
                </Button>
              )}

              {userData?.userCode === "" && (
                <>
                  <Link href="http://localhost:4003/api/user/authDID">
                    <Button colorScheme="teal">DID 인증하기</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </ButtonGroup>
      </Box>

      <Flex w="100%" justify="space-evenly" align="center" gap="2" mt="50px">
        <Box cursor="pointer">
          <Link href="/">THE 여행사</Link>
        </Box>
        <Box cursor="pointer">해외여행</Box>
        <Box cursor="pointer">제주/국내여행</Box>
        <Box cursor="pointer">항공</Box>
        <Box cursor="pointer">호텔/펜션</Box>
        <Box cursor="pointer">투어/입장권</Box>
        <Box cursor="pointer">허니문</Box>
        <Box cursor="pointer">골프</Box>
        <Box cursor="pointer">제우스</Box>
        <Box cursor="pointer" onClick={getPoint}>
          포인트
        </Box>
      </Flex>
    </>
  );
};

export default Header;

// HOME FASHION HIGH JEWELRY FINE JEWELRY WATCHES EYEWEAR FRAGRANCE MAKEUP SKINCARE

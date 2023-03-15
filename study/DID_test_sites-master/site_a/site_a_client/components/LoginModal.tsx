import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FormEvent, useContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { useCookies } from "react-cookie";
import { Global } from "../pages/_app";
import Link from "next/link";
import { setCookies } from "cookies-next";

function LoginModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [, setCookie] = useCookies();

  const { isLogin, setIsLogin, setUserToken } = useContext(Global);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {
      userId: { value: userId },
      userPw: { value: userPw },
    } = e.target;

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4001/api/user/login",
        { userId, userPw }
      );
      const { error, loginCheck, token } = response.data;
      if (!error && loginCheck) {
        if (setUserToken === undefined || setIsLogin === undefined) return;
        alert("로그인 되었습니다.");
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
        setIsLogin(true);
        onClose();
      } else if (error && !loginCheck) {
        alert("일치하는 회원이 없습니다. 아이디와 패스워드를 확인해주세요.");
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      alert("로그인이 정상적으로 처리되지 않았습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLogin === false) return;
    else {
      Router.push("/");
    }
  }, [isLogin]);

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen}>
        Login
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>L O G I N</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormLabel>I D</FormLabel>
              <Input name="userId" ref={initialRef} placeholder="Id" />
              <FormLabel mt={5}>P A S S W O R D</FormLabel>
              <Input name="userPw" type="password" placeholder="Password" />
            </ModalBody>

            <ModalFooter display="flex" justifyContent="space-between">
              <Box>
                <Link href="http://localhost:4001/api/user/DIDlogin">
                  <Button colorScheme="teal">DID Login</Button>
                </Link>
              </Box>
              <Box alignSelf="flex-end">
                <Button type="submit" colorScheme="blackAlpha" mr={3}>
                  Login
                </Button>
                <Button colorScheme="blackAlpha" onClick={onClose}>
                  Cancel
                </Button>
              </Box>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginModal;

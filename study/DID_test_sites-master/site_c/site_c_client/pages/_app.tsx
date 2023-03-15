import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import { createContext, useEffect, useState } from "react";
import { IGlobal, IUserData } from "../interface/user.interface";
import { useCookies } from "react-cookie";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";

export const Global = createContext<IGlobal>({});

function MyApp({ Component, pageProps }: AppProps) {
  const [userToken, setUserToken] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({});
  const [cookies, , removeCookie] = useCookies();

  const globalState = {
    userToken,
    setUserToken,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  };

  useEffect(() => {
    if (userToken === "") return;
    (async () => {
      try {
        const response: AxiosResponse = await axios.post(
          "http://localhost:4003/api/user/sendToken",
          {
            userToken,
          }
        );
        const result = response.data;
        setUserData(result);
        if (result.userId === "") {
          Router.push("/registDID");
        } else {
          setIsLogin(true);
        }
      } catch (err) {
        const error = err as AxiosError<any>;
        console.log(error);
        setIsLogin(false);
        removeCookie("CHANNEL_Token");
        setUserToken("");
      }
    })();
  }, [userToken]);

  useEffect(() => {
    const { CHANNEL_Token: token } = cookies;
    if (token) {
      setUserToken(token);
    }

    if (window.location.search.substring(1).split("=")[1] === "false") {
      alert("이미 인증에 사용된 DID 계정입니다. 다른 DID 계정을 사용해주세요.");
      window.location.href = "http://localhost:4003/api/user/logout";
    }
  }, []);

  return (
    <Global.Provider value={globalState}>
      <ChakraProvider>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </Global.Provider>
  );
}

export default MyApp;

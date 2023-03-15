import { Center } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { SignUpBtn, SignUpFrm, SignUpTitle } from "../components/registForm";
import { Global } from "./_app";

const RegistDID = () => {
  const [idCheck, setIdCheck] = useState("");

  const [, setCookie, removeCookie] = useCookies();

  const { isLogin, setIsLogin, setUserToken, userData } = useContext(Global);

  const idOverlap = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) setIdCheck("");

    try {
      if (e.target.value.match(/^[A-Za-z|0-9|]{4,12}$/gi) !== null) {
        const response: AxiosResponse = await axios.post(
          "http://localhost:4001/api/user/idOverlapChk",
          {
            inputId: e.target.value,
          }
        );
        if (response.data.idCheck) setIdCheck("true");
        else setIdCheck("false");
      } else {
        setIdCheck("false");
      }
      if (e.target.value.length === 0) setIdCheck("");
    } catch (err) {
      const error = err as AxiosError<any>;
      alert("Internal Server Error");
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (idCheck !== "true") {
      alert("아이디를 확인해주세요.");
      return;
    }

    const {
      userId: { value: userId },
    } = e.target;

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4001/api/user/registWithDID",
        { userId, userCode: userData?.userCode }
      );
      const { error, token } = response.data;
      if (!error) {
        if (setUserToken === undefined || setIsLogin === undefined) return;
        alert("아이디 설정이 완료되었습니다. DID 로그인 이용이 가능합니다.");
        setUserToken(token);
        setCookie("CHANNEL_Token", token);
        setIsLogin(true);
        removeCookie("DID_Progress_Token");
        Router.push("/");
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      alert(
        "아이디 설정이 정상적으로 처리되지 않았습니다. 다시 시도해 주세요."
      );
      console.log(error);
    }
  };

  return (
    <>
      <SignUpTitle>
        <p>CHANNEL에서 사용할 아이디를 설정해주세요.</p>
      </SignUpTitle>
      <Center mb="30px" color="red">
        아이디를 설정하지 않으면 로그인이 불가합니다.
      </Center>
      <SignUpFrm onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="userId">아이디</label>
            <input type="text" name="userId" onChange={idOverlap} />
            {idCheck === "" ? (
              <span className="false">
                4 ~ 12자 알파벳과 영어만 가능합니다.
              </span>
            ) : null}
            {idCheck === "true" ? (
              <span className="true">사용 가능한 아이디입니다.</span>
            ) : null}
            {idCheck === "false" ? (
              <span className="false">사용 불가능한 아이디입니다.</span>
            ) : null}
          </li>
        </ul>
        <SignUpBtn type="submit">아이디 설정하기</SignUpBtn>
      </SignUpFrm>
    </>
  );
};

export default RegistDID;

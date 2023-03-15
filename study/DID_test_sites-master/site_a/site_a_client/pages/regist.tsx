import React, { useEffect, useState } from "react";
import { SignUpBtn, SignUpFrm, SignUpTitle } from "../components/registForm";
import axios, { AxiosError, AxiosResponse } from "axios";
import Router from "next/router";

const Regist = () => {
  const [inputPw, setInputPw] = useState("");
  const [inputPw2, setInputPw2] = useState("");
  const [idCheck, setIdCheck] = useState("");
  const [pwCheck, setPwCheck] = useState("");

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

  const pwOverlap = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setPwCheck("");
    setInputPw(e.target.value);
  };

  const pwOverlap2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // setPwCheck("");
    setInputPw2(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (idCheck !== "true") {
      alert("아이디를 확인해주세요.");
      return;
    }

    if (pwCheck !== "true") {
      alert("비밀번호를 확인해주세요");
      return;
    }

    const {
      userId: { value: userId },
      userPw: { value: userPw },
    } = e.target;
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4001/api/user/regist",
        { userId, userPw }
      );
      console.log(response.data);
      if (!response.data.error) {
        alert("회원가입이 완료되었습니다.");
        Router.push("/");
      }
    } catch (err) {
      const error = err as AxiosError<any>;
      alert("회원가입이 정상적으로 처리되지 않았습니다. 다시 시도해 주세요.");
      console.log(error);
    }
  };

  useEffect(() => {
    const pwCheck1 = inputPw.match(/^[A-Za-z|0-9|~!@#$%^&*]{4,16}$/gi)?.length;
    const pwCheck2 = inputPw2.match(/^[A-Za-z|0-9|~!@#$%^&*]{4,16}$/gi)?.length;

    if (
      inputPw === inputPw2 &&
      (pwCheck1 !== undefined || pwCheck2 !== undefined)
    ) {
      setPwCheck("true");
    }

    if (
      inputPw !== inputPw2 &&
      (pwCheck1 !== undefined || pwCheck2 !== undefined)
    ) {
      setPwCheck("false");
    }

    if (pwCheck1 === undefined || pwCheck2 === undefined) {
      setPwCheck("wrongPw");
    }
  }, [inputPw, inputPw2]);

  return (
    <>
      <SignUpTitle>
        <p>Sign up to CHANNEL</p>
      </SignUpTitle>
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
          <li>
            <label htmlFor="userPw">비밀번호</label>
            <input type="password" name="userPw" onChange={pwOverlap} />
          </li>
          <li>
            <label htmlFor="pwCheck">비밀번호 확인</label>
            <input type="password" name="pwCheck" onChange={pwOverlap2} />
            {pwCheck === "" ? (
              <span className="false">비밀번호를 확인해주세요</span>
            ) : null}
            {pwCheck === "true" ? (
              <span className="true">비밀번호가 일치합니다.</span>
            ) : null}
            {pwCheck === "false" ? (
              <span className="false">비밀번호가 일치하지 않습니다.</span>
            ) : null}
            {pwCheck === "wrongPw" ? (
              <span className="false">
                4 ~ 16자, 알파벳, 숫자, 특수문자(~,!,@,#,$,%,^,&amp;,*)
              </span>
            ) : null}
          </li>
        </ul>
        <SignUpBtn type="submit">회원가입</SignUpBtn>
      </SignUpFrm>
    </>
  );
};

export default Regist;

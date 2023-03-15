import { useContext, useEffect, useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { Logo, Nav, StyledHeader } from '../styles/header/Header';
import joinOrLogin from '../pages/api/joinOrLogin';
import Router from 'next/router';
import { Global, initialUserData } from '../pages/_app';
import StyledBtn from '../styles/styledBtn';
import { useCookies } from 'react-cookie';
import { disconnect } from 'process';
import disconnectFromApp from '../pages/api/disconnect';

const Header = () => {
  const { web3, account } = useWeb3();
  const { userData, setUserData, isLogin, setIsLogin } = useContext(Global);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (!account) return;

    if (!setIsLogin || !setUserData) return;
    (async () => {
      const result = await joinOrLogin(account);
      if (!result) {
        setIsLogin(false);
        setUserData(initialUserData);
        alert('잠시 후에 다시 시도해주세요');
        return;
      }

      if (!result.signUp) {
        setIsLogin(false);
        setUserData(initialUserData);
        Router.push({ pathname: '/signup', query: { account } }, '/signup');
      } else {
        setIsLogin(true);
        setUserData(result.userData);
        setCookie('B_SITE_COOKIE', result.userData._id);
        Router.push('/');
      }
    })();
  }, [account]);

  const moveToDID = () => {
    location.href = 'http://localhost:4002/DID';
  };

  const disconnect = async () => {
    if (!userData?.userCode || !setUserData) return;

    // const result = await disconnectFromApp(userData.userCode);
    // if (result) {
    //   setUserData({ ...userData, userCode: '' });
    //   alert('DID 인증이 철회 되었습니다.');
    // } else {
    //   alert('잠시후 다시 시도해주세요.');
    // }
    location.href = `http://localhost:4002/did/disconnect?userCode=${userData.userCode}`;
  };

  return (
    <>
      <StyledHeader id="header">
        <Logo id="logo">너도 농부</Logo>
        <Nav id="nav">
          {isLogin && <li>{userData?.alias}님 환영합니다.</li>}
          {!userData?.userCode ? (
            <li>
              <StyledBtn
                w="120px"
                h="40px"
                fs="17px"
                fw={600}
                onClick={moveToDID}
              >
                DID 인증
              </StyledBtn>
            </li>
          ) : (
            <li>
              <StyledBtn
                w="120px"
                h="40px"
                fs="17px"
                fw={600}
                onClick={disconnect}
              >
                DID 철회
              </StyledBtn>
            </li>
          )}
        </Nav>
      </StyledHeader>
    </>
  );
};

export default Header;

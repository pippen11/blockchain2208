import Router from 'next/router';
import { FormEvent, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import {
  Alert,
  AlertDesc,
  AlertTitle,
  AlertWrap,
} from '../styles/metamask/metamask';
import StyledBtn from '../styles/styledBtn';
import registAlias, { IRegistAlias } from './api/regist';
import { Global, IGlobal, initialUserData } from './_app';

const Signup = () => {
  const { account } = Router.query;
  const [alias, setAlias] = useState<string>('');
  const { setIsLogin, setUserData } = useContext(Global);
  const [, setCookie] = useCookies();

  const regist = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!setIsLogin || !setUserData) return;

    if (typeof account !== 'string') return;
    const payload: IRegistAlias = { account, alias };

    const response = await registAlias(payload);

    if (!response.result) {
      setIsLogin(false);
      setUserData(initialUserData);
      alert('잠시후 다시 시도해 주세요');
    } else {
      alert('등록되었습니다.');
      setIsLogin(true);
      setUserData(response.userData);
      setCookie('B_SITE_COOKIE', response.userData._id);
      console.log(response);
      Router.push('/');
    }
  };

  return (
    <AlertWrap>
      <Alert>
        <AlertTitle>회원가입</AlertTitle>
        <AlertDesc>
          현재 메타마스크에 연결된 계정은
          <br />
          사이트에 가입되지 않은 계정입니다.
          <br />
          닉네임을 정해주세요.
        </AlertDesc>
        <form action="" onSubmit={regist}>
          <div
            style={{
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <label htmlFor="">닉네임</label>
            <input
              type="text"
              style={{ width: '200px', margin: '10px', height: '20px' }}
              onChange={(e) => {
                setAlias(e.target.value);
              }}
              value={alias}
            />
            <StyledBtn w="100px" h="30px" fs="18px" fw={400} type="submit">
              제출
            </StyledBtn>
          </div>
        </form>
      </Alert>
    </AlertWrap>
  );
};

export default Signup;

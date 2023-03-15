import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import { Contents, Wrap } from '../styles/content/contentWrap';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';

interface IUserData {
  _id: number;
  address: string;
  alias: string;
  pt: number;
  userCode: string;
}

export interface IGlobal {
  userData?: IUserData;
  setUserData?: Dispatch<SetStateAction<IUserData>>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
}

export const Global = createContext<IGlobal>({});

export const initialUserData: IUserData = {
  _id: 0,
  address: '',
  alias: '',
  pt: 0,
  userCode: '',
};

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>(initialUserData);

  const initialState: IGlobal = {
    userData,
    setUserData,
    isLogin,
    setIsLogin,
  };

  useEffect(() => {
    if (!window.ethereum) {
      Router.push('/metamask');
    }
  }, []);

  return (
    <Global.Provider value={initialState}>
      <Header />
      <Wrap>
        <Contents>
          <Component {...pageProps} />
        </Contents>
      </Wrap>
    </Global.Provider>
  );
}

export default MyApp;

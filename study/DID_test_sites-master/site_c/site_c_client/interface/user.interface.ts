import { Dispatch, SetStateAction } from "react";

export interface IDIDpoint {
  a_idx: string;
  name: string;
  pt: string;
}

export interface IUserData {
  userCode?: string;
  userId?: string;
  point?: number;
  DIDpoint?: IDIDpoint[];
}

export interface IGlobal {
  userToken?: string;
  setUserToken?: Dispatch<SetStateAction<string>>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
  userData?: IUserData;
  setUserData?: Dispatch<SetStateAction<IUserData>>;
}

declare interface IUserInfo {
  _id: string | undefined;
  account: string;
  nickname: string;
  email: string;
  avatar: string;
  subscribeStartTimestamp: string;
  subscribeEndTimestamp: string;
  subscribeState: boolean;
}

declare interface UserState {
  userInfo: IUserInfo;
  isNew: 'untracked' | 'true' | 'false';
  isLogin: boolean;
  isLoading: boolean;
}

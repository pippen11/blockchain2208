import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppState } from '../../modules/store';
import axios, { AxiosResponse } from 'axios';

export const joinAsync = createAsyncThunk('user/join', async (userInfo: IUserInfo) => {
  const response: AxiosResponse = await axios.post('https://nft-unes-test-be.vercel.app/api/user/join', { userInfo });
  return response.data;
});

export const loginAsync = createAsyncThunk('user/login', async (account: string) => {
  const response: AxiosResponse = await axios.post('https://nft-unes-test-be.vercel.app/api/user/login', { account });
  return response.data;
});

export const checkNickAsync = createAsyncThunk('form/check', async (nickname: string) => {
  const response: AxiosResponse = await axios.get('https://nft-unes-test-be.vercel.app/api/user/getAllUserNick');
  const isValidNick = response.data.every((existedNick: string) => existedNick !== nickname);
  return isValidNick;
});

export const modifyProfile = createAsyncThunk('form/modify', async (account: string) => {
  // const response: AxiosResponse
});

export const subscribeTxAsync = createAsyncThunk('user/subscribeTx', async (account: string) => {
  const response: AxiosResponse = await axios.post('https://nft-unes-test-be.vercel.app/api/subscribe/subscribeTx', {
    account,
  });
  console.log('slicesubTx', response.data);
  return response.data;
});

export const subscribeStateAsync = createAsyncThunk('user/subscribeState', async (account: string) => {
  const response: AxiosResponse = await axios.post('https://nft-unes-test-be.vercel.app/api/subscribe/subscribeState', {
    account,
  });
  console.log('slicesubSt', response.data);
  return response.data;
});

export const subscribeRefundTxAsync = createAsyncThunk('user/subscribeRefundTx', async (account: string) => {
  const response: AxiosResponse = await axios.post(
    'https://nft-unes-test-be.vercel.app/api/subscribe/subscribeRefundTx',
    {
      account,
    },
  );
  console.log('slicesubReTx', response.data);
  return response.data;
});

export const subscribeCancelStateAsync = createAsyncThunk('user/subscribeCancelState', async (account: string) => {
  const response: AxiosResponse = await axios.post(
    'https://nft-unes-test-be.vercel.app/api/subscribe/subscribeCancelState',
    {
      account,
    },
  );
  console.log('slicesubCancel', response.data);
  return response.data;
});

export const initialState: UserState = {
  userInfo: {
    _id: '',
    account: '',
    nickname: '',
    email: '',
    avatar: '',
    subscribeStartTimestamp: null,
    subscribeEndTimestamp: null,
    subscribeState: false,
  },
  isNew: 'untracked',
  isLogin: false,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.isNew = 'untracked';
      state.userInfo._id = undefined;
      state.userInfo.account = '';
      state.userInfo.email = '';
      state.userInfo.nickname = '';
      state.userInfo.avatar = '';
      state.userInfo.subscribeStartTimestamp = null;
      state.userInfo.subscribeEndTimestamp = null;
      state.userInfo.subscribeState = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.isNew === 'true') {
          state.isNew = 'false';
          state.isLogin = true;
          state.userInfo = action.payload.userInfo;
          state.isLoading = false;
        } else {
          state.isLogin = true;
          state.userInfo = action.payload.userInfo;
          state.isLoading = false;
        }
      })
      .addCase(joinAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isNew = 'false';
        state.isLogin = true;
        state.userInfo = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        state.isLogin = false;
        state.isNew = 'true';
        state.userInfo._id = undefined;
        state.userInfo.account = '';
        state.userInfo.email = '';
        state.userInfo.nickname = '';
        state.userInfo.avatar = '';
      })
      .addCase(subscribeTxAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(subscribeTxAsync.fulfilled, (state, action) => {
        const { result } = action.payload;
        console.log('result', result);
      })
      .addCase(subscribeStateAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(subscribeStateAsync.fulfilled, (state, action) => {
        const { result } = action.payload;
        console.log('result', result);
        state.userInfo.subscribeStartTimestamp = result.subscribeStartTimestamp;
        state.userInfo.subscribeEndTimestamp = result.subscribeEndTimestamp;
        state.userInfo.subscribeState = result.subscribeState;
        console.log('스테', state);
      })
      .addCase(subscribeRefundTxAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(subscribeRefundTxAsync.fulfilled, (state, action) => {
        const { result } = action.payload;
        console.log('refundresult', result);
      })
      .addCase(subscribeCancelStateAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(subscribeCancelStateAsync.fulfilled, (state, action) => {
        const { result } = action.payload;
        console.log('cancelState', result);
        state.userInfo.subscribeState = result.subscribeState;
      });
  },
});

export const { logout } = userSlice.actions;
export const userState = (state: AppState) => state.user;
export default userSlice.reducer;

import { useEffect, useReducer, useState } from 'react';
import useWeb3 from '../../hooks/useWeb3';
import { useAppDispatch, useAppSelector } from '../../hooks/exhook';
import { joinAsync, userState, checkNickAsync } from './userSlice';
import { batch } from 'react-redux';
import { handleJoin, handleScroll } from '../../modules/modalSlice';
import styled from 'styled-components';

const JoinForm = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [nickForm, setNickForm] = useState(false);
  const [emailForm, setEmailForm] = useState(false);
  const [joinStatus, setJoinStatus] = useState(false);
  const { account } = useWeb3();

  const submitUserInfo = () => {
    const userInfo: IUserInfo = {
      _id: undefined,
      account,
      nickname,
      email,
      avatar: '',
      subscribeState: false,
      subscribeStartTimestamp: '',
      subscribeEndTimestamp: '',
    };
    dispatch(joinAsync(userInfo));
    setNickname('');
    setEmail('');
  };

  // const clickModal = () => {
  //   batch(() => {
  //     dispatch(handleJoin());
  //     dispatch(handleScroll());
  //   });
  // };

  const checkNickForm = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    const isValidNick = await dispatch(checkNickAsync(e.target.value));
    if (!isValidNick.payload || e.target.value === '') {
      setNickForm(false);
    } else {
      setNickForm(true);
    }
  };

  const checkEmailForm = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailReg = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (emailReg.test(e.target.value)) {
      console.log(emailReg.test(email));
      setEmailForm(true);
    } else {
      setEmailForm(false);
    }
  };

  useEffect(() => {
    if (joinStatus) {
      window.location.href = '/';
    }
  }, [joinStatus]);

  useEffect(() => {
    if (user.isLogin && user.isNew === 'false') {
      setJoinStatus(true);
    }
  }, [user]);

  return (
    <div className="pr-10 pl-10 pt-20 mt-5 pb-5 mb-5 ">
      <div className="flex justify-center">
        <div id="join-outer" className="flex flex-col justify-center align-middle">
          <div id="join-input-box" className="pb-1 pl-0.5 pt-3 pr-3 border-b-2">
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={checkNickForm}
              className="text-zinc-200 bg-gray-500"
            />
            {nickForm ? (
              <p className="text-white">닉네임 ok</p>
            ) : nickname === '' ? (
              <p className="text-white">닉네임은 필수값입니다.</p>
            ) : (
              <p className="text-white">중복된 닉네임입니다.</p>
            )}
          </div>
          <div id="join-input-box" className="pb-1 pl-0.5 pt-3 pr-3 border-b-2">
            <input
              type="text"
              name="email"
              value={email}
              onChange={checkEmailForm}
              className="text-zinc-200 border-slate-300 shadow-sm focus:outline-none bg-gray-500"
            />
            {emailForm ? (
              <p className="text-white">이메일 ok</p>
            ) : (
              <p className="text-white">이메일 양식이 맞지 않습니다</p>
            )}
          </div>
        </div>
        <button
          className="text-zinc-200 border-slate-300 shadow-sm focus:outline-none bg-gray-500"
          onClick={submitUserInfo}
          disabled={nickForm && emailForm ? false : true}
        >
          join
        </button>
        {/* <button onClick={clickModal}>close</button> */}
      </div>
    </div>
  );
};

export default JoinForm;

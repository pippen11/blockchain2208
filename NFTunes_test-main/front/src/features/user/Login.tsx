import { useAppSelector, useAppDispatch } from '../../hooks/exhook';
import useWeb3 from '../../hooks/useWeb3';
import { userState, loginAsync, logout } from './userSlice';

const Login = () => {
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();
  const { account } = useWeb3();

  const loginUser = async () => {
    if (user.isNew === 'true') {
      window.location.href = '/user/join';
    }
    if (user.isNew === 'untracked') {
      const result = await dispatch(loginAsync(account));
      if (result.type === 'user/login/rejected') {
        window.location.href = '/user/join';
      }
    }
    if (!user.isLogin && user.isNew === 'false') {
      dispatch(loginAsync(account));
    }
  };

  const logoutUser = async () => {
    dispatch(logout());
    localStorage.removeItem('user');
    alert('로그아웃 완료');
  };

  return (
    <div className="pt-5 mt-5 mb-10 snap-start flex-shrink-0">
      {user.isLogin ? (
        <>
          <p>
            <button onClick={logoutUser}>LOGOUT</button>
          </p>
        </>
      ) : (
        <button onClick={loginUser}>LOGIN</button>
      )}
    </div>
  );
};

export default Login;

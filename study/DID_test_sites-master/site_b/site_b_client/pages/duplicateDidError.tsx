import { useEffect } from 'react';

const ErrorPage = () => {
  useEffect(() => {
    alert('이미 인증에 사용된 DID 계정입니다.');
  }, []);
  return <></>;
};

export default ErrorPage;

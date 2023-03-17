import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { getUserByAcct, getUserInfo } from '../api/account';
import Mypage from '../../src/features/mypage/MyPage';
import { useAppSelector } from '../../src/hooks/exhook';
import { userState } from '../../src/features/user/userSlice';
import NoAccess from '../../src/features/_main/NoAccess';

export default function MyPagePerAcct({ details }) {
  const user = useAppSelector(userState);

  const router = useRouter();
  if (router.isFallback) {
    return <div className="flex flex-col items-center justify-center min-h-screen py-2">Loading...</div>;
  }

  return <>{user.userInfo.account === details.account ? <Mypage userInfo={details} /> : <NoAccess />}</>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getUserInfo();
  const paths = data.map((user) => {
    return { params: { acct: user.account } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const { details } = await getUserByAcct(params.acct);
  if (!details) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      details,
    },
  };
};

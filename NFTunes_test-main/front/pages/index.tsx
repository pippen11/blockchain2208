import { NextPage } from 'next';
import Head from 'next/head';
import { useAppSelector } from '../src/hooks/exhook';
import { userState } from '../src/features/user/userSlice';
import { scrollCount } from '../src/modules/modalSlice';
import Login from '../src/features/user/Login';
import TestScroll from '../src/test/TestScroll';
import SlideList from '../src/features/_main/SlideList';

// 'next/document' 의 `Head` 컴포넌트 를 사용함으로 SEO(Search Engine Optimization) 를 가능하게 만듬.
const Main: NextPage = () => {
  const control = useAppSelector(scrollCount);

  const user = useAppSelector(userState);

  console.log(user);
  return (
    <div className="h-full">
      <Head>
        <title>임시 인덱스</title>
        <meta name="description" content="임시 인덱스 페이지입니다." />
      </Head>
      <section id="main" className=" overflow-hidden mx-auto h-full max-w-7xl">
        {/* <div className="pt-20 text-white"></div> */}
        {/* <SlideList /> */}
        <TestScroll />
      </section>
    </div>
  );
};

export default Main;

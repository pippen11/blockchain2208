import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import InputBox from "../components/InputBox";
import { Header } from "../components/Header";
import { Wrapper } from "../components/Wrapper";
import Image from "next/image";
import useWeb3 from "../hooks/useWeb3";
import AlertModal from "../components/AlertModal";

const Home: NextPage = () => {
  const { account, web3 } = useWeb3();

  if (!account)
    return (
      <>
        <AlertModal />
        <Layout>
          <Wrapper>
            <Image
              src="/logo.png"
              alt="sheild_icon"
              width="100px"
              height="100px"
              layout="intrinsic"
            />
            <Header>Check the registered users on Helpless-DID</Header>
            <InputBox web3={web3} account={account} />
          </Wrapper>
        </Layout>
      </>
    );

  return (
    <>
      <Layout>
        <Wrapper>
          <Image
            src="/logo.png"
            alt="sheild_icon"
            width="100px"
            height="100px"
            layout="intrinsic"
          />
          <Header>Check the registered users on Helpless-DID</Header>
          <InputBox web3={web3} account={account} />
        </Wrapper>
      </Layout>
    </>
  );
};

export default Home;

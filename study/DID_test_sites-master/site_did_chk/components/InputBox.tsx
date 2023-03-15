import { Button, Flex, Spinner } from "@chakra-ui/react";
import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Comment_False from "./Comment_False";
import Comment_True from "./Comment_True";
import Web3 from "web3";
import DID_L1 from "../contract/DID_L1.json";
import { Contract } from "web3-eth-contract";

const Input = styled.input`
  font-size: 25px;
  padding: 10px;
  margin: 10px;
  background: white;
  border: none;
  border-radius: 10px;
  width: 800px;
  height: 50px;
  ::placeholder {
    color: grey;
  }
`;

interface PropsType {
  web3?: Web3;
  account?: string | Web3;
}

type JsonType = {
  [key: string]: any;
};

const InputBox: React.FC<PropsType> = ({ web3, account }) => {
  const [deployed, setDeployed] = useState<Contract>();
  const [isUser, setIsUser] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const DIDjson: JsonType = DID_L1;
  console.log(web3);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let { value: userCode } = e.target.userCode;
    if (userCode == "") {
      userCode = "false";
    }

    setIsLoading(true);
    await deployed?.methods.isDIDuser(userCode).send({
      from: account,
    });
  };

  useEffect(() => {
    (async () => {
      if (!web3) return;

      const networkId = await web3.eth.net.getId();
      const CA = DIDjson.networks[networkId].address;
      const abi = DIDjson.abi;
      const Deployed = new web3.eth.Contract(abi, CA);

      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        const params = [{ type: "bool", name: "check" }];
        const value = web3.eth.abi.decodeLog(params, log.data, []);

        setIsUser(value.check);
        setIsLoading(false);
      });

      setDeployed(Deployed);
    })();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex justify="center" align="center" direction="row">
          <Input name="userCode" placeholder="Please enter user code." />
          <Button colorScheme="teal" size="lg" type="submit" height="50px">
            Check
          </Button>
        </Flex>
      </form>
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="15px"
        />
      )}

      {isUser ? (
        <Comment_True isUser={isUser} />
      ) : (
        <Comment_False isUser={isUser} />
      )}
    </>
  );
};

export default InputBox;

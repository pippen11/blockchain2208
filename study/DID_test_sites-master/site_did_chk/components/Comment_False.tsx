import { Box } from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";

interface IisUser {
  isUser?: string;
}

export const Comment = styled.div`
  width: 1000px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  display: ${(props: IisUser) => {
    if (props.isUser == undefined) {
      return "none";
    } else if (props.isUser == "false") {
      return "visible";
    }
  }};
`;

const Comment_False: React.FC<IisUser> = ({ isUser }) => {
  return (
    <Comment isUser={isUser}>
      <Image
        src="/alert_icon.png"
        alt="chkFalse"
        width="50px"
        height="50px"
        layout="intrinsic"
      />
      <Box fontSize="20px" color="red" fontWeight="bold" ml="10px">
        Helpless-DID에 등록된 사용자가 아닙니다.
      </Box>
    </Comment>
  );
};

export default Comment_False;

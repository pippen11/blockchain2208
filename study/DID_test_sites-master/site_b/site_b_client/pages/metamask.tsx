import Image from 'next/image';
import {
  Alert,
  AlertWrap,
  AlertTitle,
  AlertDesc,
} from '../styles/metamask/metamask';
import StyledBtn from '../styles/styledBtn';

const Metamask = () => {
  const openMetamaskDownload = () => {
    window.open('https://metamask.io/download/');
  };

  return (
    <AlertWrap>
      <Alert>
        <Image
          src="/images/alert_icon.png"
          width={80}
          height={80}
          alt="alert_icon"
        />
        <AlertTitle>메타마스크가 설치되어 있지 않습니다.</AlertTitle>
        <AlertDesc>
          우리 사이트는 메타마스크가 설치되어 있어야 사용 가능합니다.
          <br />
          아래의 버튼을 통해 메타마스크 설치 후 다시 이용해주세요.
        </AlertDesc>
        <StyledBtn w="200px" fs="20px" fw={500} onClick={openMetamaskDownload}>
          메타마스크 설치
        </StyledBtn>
      </Alert>
    </AlertWrap>
  );
};

export default Metamask;

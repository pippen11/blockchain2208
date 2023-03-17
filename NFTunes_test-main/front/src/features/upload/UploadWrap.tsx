import styled from 'styled-components';

const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const MainBox = styled.div`
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  padding-top: 100px;

  > h1 {
    color: white;
    height: 50px;
    width: 80%;
    margin: 0 auto;
    border-bottom: 0.5px solid #646464;
    font-family: 'Regular';
    font-size: 20px;
  }
`;

const UploadWrap = ({ children }) => {
  return (
    <OutBox>
      <MainBox>
        <h1>Music Uploads</h1>
        {children}
      </MainBox>
    </OutBox>
  );
};

export default UploadWrap;

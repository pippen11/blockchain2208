import styled from 'styled-components';

export const AlertWrap = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 30px;
`;

export const Alert = styled.div`
  width: 650px;
  height: 400px;
  border: 2px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  box-sizing: border-box;
`;

export const AlertTitle = styled.p`
  font-size: 30px;
  margin: 15px;
  font-weight: 700;
`;

export const AlertDesc = styled.span`
  font-size: 20px;
  text-align: center;
  margin-bottom: 40px;
`;

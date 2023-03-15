import styled from 'styled-components';

export const ModalBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalAlert = styled.div`
  width: 900px;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
`;

export const ModalItemInfo = styled.div`
  width: 50%;
  height: 100%;
  overflow: scroll;
  padding: 15px;
  box-sizing: border-box;
`;

export const ModalImgWrap = styled.div`
  width: 100%;
  height: 50%;
  position: relative;
`;

export const ModalItemTitle = styled.p`
  margin-top: 15px;
  font-size: 30px;
  font-weight: 600;
  height: 8%;
`;

export const ModalItemDesc = styled.p`
  margin-top: 15px;
  width: 100%;
  height: 37%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: 10px;
  overflow: scroll;
  box-sizing: border-box;
`;

export const ModalPurchase = styled.div`
  width: 50%;
  height: 100%;
  overflow: scroll;
  padding: 15px;
  box-sizing: border-box;
  border-left: 1px solid black;
`;

export const PurchaseTitle = styled.div`
  width: 100%;
  height: 50px;
  line-height: 35px;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 1px solid black;
`;

export const PriceWrap = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
`;

export const Price = styled.p`
  font-size: 25px;
  font-weight: 600;
  margin-right: 5px;
  line-height: 20px;
`;

export const PriceUnit = styled.span`
  font-size: 16px;
  color: #777;
`;

export const PointWrap = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
`;

export const PointTitle = styled.p`
  margin-top: 15px;
  font-size: 18px;
`;

export const PointInput = styled.input`
  margin-top: 5px;
  width: 250px;
  height: 25px;
  margin-bottom: 15px;
`;

export const DIDPointTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-top: 10px;
`;

export const DIDPointWrap = styled.ul`
  width: 100%;
  height: 290px;
  overflow: scroll;
  border-bottom: 1px solid black;
`;

export const DIDPointList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

interface IBtnProps {
  bgc: string;
}

export const Btn = styled.button`
  width: 47%;
  height: 35px;
  font-size: 17px;
  border: none;
  border-radius: 20px;
  background-color: ${(props: IBtnProps) => props.bgc};
  cursor: pointer;
`;

import styled from 'styled-components';

export const Items = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8%;
`;

export const ItmeListWrap = styled.li`
  width: 19%;
  height: 300px;
  border-radius: 20px;
  padding: 20px 15px;
  box-sizing: border-box;
  border: 2px solid black;
  cursor: pointer;
  margin-bottom: 40px;
`;

export const ImgWrap = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItmeTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 3px;
`;

export const ItemDesc = styled.span`
  font-size: 12px;
  color: #777;
  height: 44px;
  margin-bottom: 5px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  padding: 0 3px;
  box-sizing: border-box;
`;

export const PriceWrap = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ItemPrice = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const PriceUnit = styled.span`
  display: block;
  padding-bottom: 3px;
  font-size: 13px;
`;

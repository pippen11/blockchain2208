import styled from 'styled-components';

const ListWrap = styled.div`
  width: 80%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0 30px;
  margin-top: 30px;
`;

const CardList = ({ children }) => {
  return <ListWrap>{children}</ListWrap>;
};

export default CardList;

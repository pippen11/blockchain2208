import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: 1200px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  border-bottom: 2px solid black;
`;

export const Logo = styled.h1`
  width: 200px;
  height: 80px;
  background-size: 80px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const Nav = styled.ul`
  display: flex;
  align-items: center;
  font-size: 18px;

  span {
    cursor: pointer;
  }

  & > li {
    margin-right: 22px;
  }

  & > li:last-child {
    margin-right: 0;
  }
`;

import styled from 'styled-components';

interface IStyledBtnProps {
  w?: string;
  h?: string;
  fs?: string;
  fw?: number;
}

const StyledBtn = styled.button`
  width: ${(props: IStyledBtnProps) => props.w || '200px'};
  height: ${(props: IStyledBtnProps) => props.h || '50px'};
  border-radius: 10px;
  border: 5px solid darkorange;
  background-color: orange;
  font-size: ${(props: IStyledBtnProps) => props.fs || '20px'};
  font-weight: ${(props: IStyledBtnProps) => props.fw || 600};
  box-sizing: border-box;
  cursor: pointer;
`;

export default StyledBtn;

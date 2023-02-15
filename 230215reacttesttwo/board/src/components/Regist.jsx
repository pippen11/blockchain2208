import styled from "styled-components";

const RegistComponent = ({ changeFuncs, logIn }) => {
  return (
    <RegistBox>
      <label>
        ID:
        <input type="text" onInput={changeFuncs.changeId} />
      </label>
      <label>
        PW:
        <input type="text" onInput={changeFuncs.changePw} />
      </label>
      <label>
        Name:
        <input type="text" onInput={changeFuncs.changeName} />
      </label>
      <button onClick={logIn}>Log In</button>
    </RegistBox>
  );
};

export default RegistComponent;

const RegistBox = styled.div`
  label {
    display: block;
  }
`;

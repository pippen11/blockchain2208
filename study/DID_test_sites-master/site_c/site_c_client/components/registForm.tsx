import styled from "styled-components";

export const SignUpTitle = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 30px;
  font-weight: 600;
  margin-top: 80px;
  height: 80px;
`;

export const SignUpFrm = styled.form`
  width: 330px;
  margin: 0 auto;

  & > ul > li {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    & > label {
      color: black;
      margin-bottom: 3px;
      font-size: 13px;
    }

    & > input {
      width: 100%;
      height: 50px;
      box-sizing: border-box;
      border: 2px solid #a6a19e;
      border-radius: 5px;
      font-size: 16px;
      padding: 7px;
    }

    & > input:focus {
      border: 2px solid dodgerblue;
      outline: none;
    }
  }

  span {
    margin-top: 10px;
  }

  .false {
    color: red;
  }

  .true {
    color: green;
  }
`;

export const SignUpBtn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: none;
  text-align: center;
  line-height: 45px;
  background-color: #0000005c;
  color: white;
  margin-bottom: 30px;
  cursor: pointer;
  font-size: 17px;
`;

import styled from "styled-components";
import { useState } from "react";

const MordalComponent = ({ SetMordal }) => {
  return (
    <MordalBox>
      <Test>
        <Search>Search not found</Search>
        <Imgtest>
          <Img
            onClick={(e) => {
              SetMordal(false);
            }}
            // style={{
            //   width: 60,
            // }}
            src="https://media.giphy.com/media/KFtoeyGbuENeJrnv2j/giphy.gif"
          ></Img>
        </Imgtest>
      </Test>
      <ERRor>
        <div>Oops! The search string you entered</div>
        <div>Sorry! This is an invalid search string.</div>
      </ERRor>
      {/* <div className="flex">
        <div>
          <div className="inputBox"></div>
          <div className="inputBox"></div>
        </div>
      </div> */}
    </MordalBox>
  );
};

export default MordalComponent;
const Imgtest = styled.div`
  /* margin-left: 20px; */
  /* position: absolute; */
`;
const Search = styled.div`
  font-size: 30px;
  color: #0784c3;
`;
const ERRor = styled.div`
  padding-left: 20px;
  font-size: 17px;
  color: grey;
`;
const Test = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-around; */
`;

const Img = styled.img``;

const MordalBox = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 300px;
  width: 500px;
  border: 2px solid #565d79;
  border-radius: 10px;
  /* background-color: white; */
  background-image: url("/imgs/notfound.png");
  background-repeat: no-repeat;
  background-position: 10% 1%;

  @media (max-width: 650px) {
    width: 80%;
  }

  img {
    width: 20px;
    cursor: pointer;
  }

  .regist > div:first-child {
    margin-top: 6px;
    color: #3399ff;
    font-weight: 600;
  }
  .regist > div:last-child {
    color: #666666;
    font-size: 12px;
  }

  .regist {
    width: 400px;
    height: 60px;
    border: 1px solid #3399ff;
    margin-top: 30px;
    margin-left: 70px;
    text-align: center;
    cursor: pointer;

    @media (max-width: 650px) {
      width: 60%;
      margin: auto;
    }
  }

  .login {
    width: 100px;
    height: 100px;
    background-color: #3399ff;
    color: white;
    border: none;
  }
  input {
    width: 280px;
    height: 28px;
    border: solid 1px #e1e1e2;
    padding: 10px;

    @media (max-width: 650px) {
      width: 100%;
      margin: auto;
    }
  }

  & > div:first-child {
    height: 65px;
    border-bottom: 1px solid #e0e3ea;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 20px;
  }

  & > div:first-child > div:last-child {
    margin-bottom: 20px;
  }

  .flex {
    display: flex;
    justify-content: center;
    padding-top: 50px;

    @media (max-width: 650px) {
      width: 80%;
      padding: 0;
      margin: 40px auto;
    }
  }

  .inputBox {
    width: 100%;
  }
`;

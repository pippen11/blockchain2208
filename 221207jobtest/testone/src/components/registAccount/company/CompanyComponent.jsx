import styled from "styled-components";
import banner from "./img/Jobbanner.png";
import backimg from "./img/backcolor.png";
import React from "react";
import Select from "react-select";
// import circlecheck from "circle-check-regular.svg";
const COLOR = " #3399ff";
// import magni from "./img/magnifying-glass-solid.svg";

export default function CompanyComponent() {
  const options = [
    { value: "", label: "" },
    { value: "기업형태", label: "기업형태" },
    { value: "중소기업", label: "중소기업" },
    { value: "외국계", label: "외국계" },
    { value: "중견기업", label: "중견기업" },
  ];

  return (
    <JoinBox>
      <Join>
        <img src={banner} alt="" />
      </Join>
      <Join>
        <div className="personal">개인회원</div>
        <div className="company">기업회원</div>
      </Join>
      <Join>
        <Joindetailbackground>
          <Joindetail>
            기업정보 <span style={{ color: "gray" }}>*필수정보</span>
          </Joindetail>

          <Select
            className="selectone"
            placeholder="기업형태＊"
            options={options}
          />
          <Companynumber
            type={"number"}
            placeholder="사업자등록번호 *"
          ></Companynumber>
          <Companytitle>
            <Companyname type={"text"} placeholder="회사명 *"></Companyname>
            <Companyheader
              type={"text"}
              placeholder="대표자명*"
            ></Companyheader>
          </Companytitle>
          <div className="check">
            회사명,대표자명 수정이 필요한 경우, 가입 후 고객센터(1588-9350)로
            문의 해 주세요
          </div>
          <Companyadress type={"text"} placeholder="회사주소 *"></Companyadress>
          <Companytitle>
            <Companyid type={"text"} placeholder="아이디 *"></Companyid>
            <Companypw type={"text"} placeholder="비밀번호*"></Companypw>
            <Companycheck>표시</Companycheck>
          </Companytitle>
          <Companyidname type={"text"} placeholder="가입자명 *"></Companyidname>
          <Companyidname
            type={"number"}
            placeholder="전화번호 *"
          ></Companyidname>
          <Companyidname type={"email"} placeholder="이메일 *"></Companyidname>
          <Join>
            <div className="companymember">가입하기</div>
          </Join>
        </Joindetailbackground>
      </Join>
    </JoinBox>
  );
}

const JoinBox = styled.div`
  width: 100%;
  height: 50vw;
  background-image: url(${backimg});
`;

const Join = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & .personal {
    font-size: 20px;

    display: flex;
    align-items: center;
    width: 200px;
    height: 60px;
    background-color: white;
    color: gray;
    justify-content: center;
    border-bottom: solid 1px ${COLOR};
  }

  & .company {
    font-size: 20px;

    display: flex;
    justify-content: center;
    background-color: ${COLOR};
    height: 60px;
    color: white;
    align-items: center;
    width: 400px;
  }

  & .companymember {
    font-size: 20px;
    /* padding: 1%; */
    display: flex;
    justify-content: center;
    background-color: ${COLOR};
    height: 60px;
    color: white;
    align-items: center;
    width: 93%;
    margin-top: 3%;
  }
`;

const Joindetailbackground = styled.div`
  margin-top: 30px;

  background-color: white;
  /* @media only screen and (max-width: 600px) {
    max-width: 400px;
  } */
  width: 31%;
  height: 75vh;

  & .selectone {
    padding: 3%;

    width: 600px;
  }

  & .check {
    padding: 3%;
    margin-left: 1%;
    color: gray;
    font-size: 13px;
  }
`;

const Joindetail = styled.div`
  display: flex;

  justify-content: space-between;
  padding: 5%;
`;

const Companynumber = styled.input`
  width: 90%;
  height: 4%;
  margin-left: 4%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 1%;
`;

const Companyadress = styled.input`
  width: 90%;
  height: 4%;
  margin-left: 4%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 1%;
`;
const Companytitle = styled.div`
  display: flex;
`;

const Companyname = styled.input`
  width: 60%;
  height: 7%;
  margin-left: 4%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 3%;
  margin-top: 2%;
`;

const Companyid = styled.input`
  width: 25%;
  height: 7%;
  margin-left: 4%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 3%;
  margin-top: 2%;
`;

const Companypw = styled.input`
  width: 40%;
  height: 7%;
  margin-left: 2%;
  margin-right: 3%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 3%;
  margin-top: 2%;
`;

const Companycheck = styled.div`
  display: flex;
  align-items: center;
  color: grey;
`;

const Companyheader = styled.input`
  width: 40%;
  height: 7%;
  margin-left: 2%;
  margin-right: 3%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 3%;
  margin-top: 2%;
`;

const Companyidname = styled.input`
  margin-top: 2%;
  width: 90%;
  height: 4%;
  margin-left: 4%;
  background-color: white;
  color: grey;
  border-style: solid;
  border-color: lightgrey;
  padding: 1%;
`;

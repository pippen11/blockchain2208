//5번 초기에 기본적인것만 파일 만들고 넣어줌
import styled from "styled-components";

const InfoComponent = ({ userName, onClick }) => {
  return (
    <InfoBox>
      {userName}님 어서오세요
      <button
        onClick={() => {
          // e.preventDefault;
          onClick();
        }}
        //온클릭에 함수호출시킴
        //그냥 적으면 문제생긴적이있어서 함수로함
      >
        Log Out
      </button>
    </InfoBox>
  );
};

export default InfoComponent;

const InfoBox = styled.div``;

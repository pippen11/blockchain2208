import styled from "styled-components";

export default function CompanyMainComponent() {
  return (
    <div>
      <InformationBox>
        <div style={{ textAlign: "left", fontSize: 20 }}>채용정보</div>
      </InformationBox>
      <Informationboxs>
        <div>
          <Boxscontentone>
            <Textfour>
              씨제이올리브네트웍스(주)<button>♡ 관심기업</button>
              <h3 style={{ color: "black" }}>블록체인 개발자</h3>
            </Textfour>
          </Boxscontentone>
          <Boxscontenttwo>
            <Testone>
              <div style={{ marginBottom: 10 }}>지원자격</div>
              <div>
                <Testtwo>
                  <div>경력</div> <Textcolor>경력</Textcolor>(2년이상)
                </Testtwo>
                <Testtwo>
                  <div>학력</div>
                  <Textcolor>대졸이상</Textcolor>
                </Testtwo>
                <Testtwo>
                  <div>우대</div>
                  <div style={{ fontSize: 10, paddingTop: 5, paddingRight: 5 }}>
                    기본우대
                  </div>
                  <div> 국가유공자</div>
                </Testtwo>
              </div>
            </Testone>

            <Testone>
              <div style={{ marginBottom: 10 }}>근무조건</div>
              <Testtwo>
                <Textthree>고용형태</Textthree>
                <Textcolor>정규직</Textcolor> 수습 3개월
              </Testtwo>
              <Testtwo>
                <Textthree>급여</Textthree>
                <div>회사내규에 따름 - 면접 후 결정</div>
              </Testtwo>
              <Testtwo>
                <Textthree>지역</Textthree>
                <div>
                  서울시 용산구 <button>지도</button>
                </div>
              </Testtwo>
              <Testtwo>
                <Textthree>시간</Textthree>
                <div>주5일(월~금) | 09:00~18:00 탄력근무제</div>
              </Testtwo>
            </Testone>
          </Boxscontenttwo>
        </div>
        <div>
          <div>1</div>
          <div>
            <div>기업정보</div>
            <div>
              <div>
                <div>산업(업종)</div>
                <div>솔루션.SL.CRM.ERP</div>
              </div>
              <div>
                <div>사원수</div>
                <div>1,500명</div>
              </div>
              <div>
                <div>설립년도</div>
                <div>1995년(28년차)</div>
              </div>
              <div>
                <div>기업형태</div>
                <div>대기업(비상장)</div>
              </div>
              <div>
                <div>홈페이지</div>
                <div>https://www.cjolivenetworks.co.kr</div>
              </div>
            </div>
          </div>
          <div>
            <button>기업정보</button>
            <button>진행중인 채용보기</button>
          </div>
        </div>
      </Informationboxs>
    </div>
  );
}

const InformationBox = styled.div`
  margin: auto;
  width: 50%;
  /* height: 100%; */
  background-color: green;
`;

const Informationboxs = styled.div`
  display: flex;
  margin: auto;
  margin-top: 10px;
  width: 50%;
  height: 350px;
  background-color: wheat;
  border-top: solid 1px black;
  border-left: solid 0.1px gray;
  border-bottom: solid 0.1px gray;
  border-right: solid 0.1px gray;
`;

const Boxscontentone = styled.div`
  padding-top: 3%;
  height: 27%;
  width: 100%;
  background-color: white;
  color: gray;
  border-bottom: solid 0.1px gray;
  border-right: solid 0.1px gray;
`;

const Boxscontenttwo = styled.div`
  width: 100%;
  height: 65%;
  background-color: white;
  border-bottom: solid 0.1px gray;
  border-right: solid 0.1px gray;
  display: flex;
`;

const Testone = styled.div`
  padding: 2.5%;
  flex: 1;
`;

const Testtwo = styled.div`
  display: flex;

  div:first-child {
    padding-right: 10px;
  }
`;

const Textcolor = styled.span`
  color: blue;
`;

const Textthree = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
  color: gray;
`;

const Textfour = styled.div`
  width: 100%;
`;

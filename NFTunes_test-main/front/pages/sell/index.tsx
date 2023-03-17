import { NextPage } from 'next';
import styled from 'styled-components';
import Imgurl from '../../public/images/cover.jpg';
import Image from 'next/image';
//Worker : gyuri
// last work : 220825

const OutBox = styled.div`
  background: black;
  width: 100%;
  height: 1400px;
  padding-top: 100px;
`;

const MainBox = styled.div`
  width: 70%;
  height: 1200px;
  /* background: red; */
  margin: 0 auto;

  > h1 {
    padding: 20px;
    font-size: 40px;
    font-family: 'Headline';
    color: #fff;
  }
`;

const SellBox = styled.div`
  /* background: purple; */
  width: 96%;
  height: 900px;
  margin: 0 auto;
  margin-top: 20px;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;

  /* background: green; */
  select {
    width: 200px;
    height: 50px;
    padding: 0.8em 1.2em;
    border: 1px solid #999;
    font-family: Fly;
    background: url('images/arrow.jpg') no-repeat 90% 50%;
    background-size: 24px;
    border-radius: 0px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: #fff;
    > option {
      color: black;
    }
  }
  select::-ms-expand {
    display: none;
  }
`;

const SearchForm = styled.form`
  /* background: red; */
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  font-family: Fly;
  .search_word {
    display: block;
    width: 80%;
    height: 100%;
    padding-left: 20px;
  }

  .search_submit {
    /* background: green; */
    width: 10%;
    height: 100%;
    box-shadow: inset 0px 0px 29px -20px #ffffff;
    background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
    background-color: #ededed;
    border: 1px solid #dcdcdc;
    display: block;
    cursor: pointer;
    color: #575757;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 10px 35px;
    font-family: 'Regular';
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
    margin: 0 auto;
  }

  .search_submit:hover {
    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
    background-color: #dfdfdf;
  }
`;

const SellList = styled.ul`
  /* background: pink; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const SellItem = styled.li`
  /* background: skyblue; */
  width: 23%;
  height: 50%;
`;

const MusicInfo = styled.div`
  /* background: red; */
  width: 100%;
  height: 20%;
  text-align: center;
  font-family: 'Regular', 'Fly';
  color: #c8c8c8;
  > h1 {
    padding-top: 15px;
  }
`;
const Sellpage: NextPage = () => {
  return (
    <>
      <OutBox>
        <MainBox>
          <h1>Music Market</h1>
          <SellBox>
            <SearchBox>
              <select>
                <option>최신순</option>
                <option>가격순</option>
                <option>좋아요순</option>
                <option>스트리밍순</option>
              </select>
              <SearchForm>
                <input type="text" className="search_word" placeholder="검색어를 입력해주세요." />
                <input type="submit" className="search_submit" value="검색" />
              </SearchForm>
            </SearchBox>
            <SellList>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
              <SellItem>
                <Image src={Imgurl} width={300} height={300} />
                <MusicInfo>
                  <h1>After Like</h1>
                  <h2>IVE (아이브)</h2>
                </MusicInfo>
              </SellItem>
            </SellList>
          </SellBox>
        </MainBox>
      </OutBox>
    </>
  );
};
export default Sellpage;

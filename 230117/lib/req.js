// POST /?name=ssm HTTP/1.1
// Content-Type: application/json
// User-Agent: PostmanRuntime/7.30.0
// Accept: */*
// Postman-Token: adf209cc-1d3d-4fb1-a206-7b4e7ada063b
// Host: localhost:4193
// Accept-Encoding: gzip, deflate, br
// Connection: keep-alive
// Content-Length: 24

// {
//     "job:""student
// }

// GET / HTTP/1.1
// Host: localhost:4193
// Connection: keep-alive
// sec-ch-ua: "Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Windows"
// Upgrade-Insecure-Requests: 1
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
// Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
// Purpose: prefetch
// Sec-Fetch-Site: none
// Sec-Fetch-Mode: navigate
// Sec-Fetch-User: ?1
// Sec-Fetch-Dest: document
// Accept-Encoding: gzip, deflate, br
// Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

const getQuery = (queryString) => {
  if (!queryString) return {}; //없으면 빈객체
  //입력된 queryString이 없으면 빈객체를 반환(리턴)한다
  const query = [];
  // 쿼리 스트링을 분해해서 담을 쿼리를 객체로 생성해준다
  queryString = queryString.split("&");
  // 각 쿼리는 & 표시로 나눠진다.
  console.log("query는", queryString);
  for (let i = 0; i < queryString.length; ++i) {
    const temp = queryString[i].split("=");
    //나눠진 각 쿼리를 '='을 기준으로 나눠서
    query[temp[0].trim()] = temp[1].trim();
    // name=ssm=>query{name:ssm}
    //trim메서드는 양쪽의 남는 공백을 모두 제거한다.
  }
  return query;
};

const getMessage = (lines) => {
  const headers = {};
  while (true) {
    const temp = lines.shift();
    if (!temp) break;
    //요청에 포함된 정보에서 body를
    // 넣기전에 빈줄을 넣어놨다
    // 그 빈줄은 lines 내에서 빈문자열 (string)으로 저장된다
    // 헤더(headers)만 파싱하기 위해 빈 스트링을 기준으로 반복을 멈추도록한다
    // 밑에 content-Length 23 jobstudent사이 공백

    //     POST /?name=ssm HTTP/1.1
    // Content-Type: application/json
    // User-Agent: PostmanRuntime/7.30.0
    // Accept: */*
    // Postman-Token: e06097a3-8d72-482f-9b22-98640c8ed6e5
    // Host: localhost:4193
    // Accept-Encoding: gzip, deflate, br
    // Connection: keep-alive
    // Content-Length: 23

    // {
    //     "job:"student
    // }
    const index = temp.indexOf(":"); // :까지 찾는데 글자하나하나를 배열의 요소로봐서 :앞에 글자갯수가 index의 갯수
    //예시 'Contemt-Type:application/json'
    let value = temp.slice(index + 1).trim();
    if (!isNaN(+value)) value = +value;
    //isNaN 숫자만 체크

    // headers[temp.slice(0, index).replaceAll("-", "").trim()] = temp
    //   .slice(index + 1) // 매개변수가 하나면 그값부터 끝까지
    //   .trim();

    headers[
      temp[0].toLowerCase() + temp.slice(1, index).replaceAll("-", "").trim()
    ] = value;
    //이건카멜형
    //tirm넣은이유는 혹시모를 오류때문에 넣었다 앞뒤의 공백을 제거
    // split으로하면 Host: localhost:4193 이거때문에 걸려서 slice로해서 index기준으로해서 첫번째 두번째 앞 뒤 키 값으로 나눔
    // 키와 값을 정의
  }
  let body = lines.join("");
  if (body) {
    if (
      global.isJson &&
      headers["contentType"].indexOf("application/json") > -1
    ) {
      //있으면 인덱스 0부터 시작이니까 없다면 -1이나옴
      body = JSON.parse(body);
    } else if (
      headers["contentType"].indexOf("application/x-www-form-urlencoded") > -1
    ) {
      body = getQuery(body);
    }
  }

  return { headers, body };
};

// parser란 무엇인가? << 파싱하는 메서드에 붙는 이름
// parsing은 무엇인가?
// -사전적 의미로는 구문 분석 , 문장을 구성성분으로 분해하고 위계 관계를 분석하여 문장의 구조를 결정
//정보를 분해 분석하여 원하는 형태로 조립한다. 즉 내가원하는 (형태)로 가공한다.

//내 소개를 할게
// 이름은 정경훈이다.
// 다루는 언어는 javascript,HTML,CSS,Solidity,C++,C#
// 기술스택은 React,Node.js,MySQL,MongoDB,BlockChain
// 직장은
//     이름은 경일 게임 아카데미
//     주소는 서울특별시 강동구 천호대로 995 금복빌딩 3,4층
//     전화번호는 02-479-4050
// 위가 정보 아래가 parsing한 데이터
// const 나={
//     이름:'정경훈',
//     언어:['javascript','HTML','CSS','Solidity','C++','C#'],
//     기술스택:['React','Node.js','MySQL','MongoDB','BlockChain'],
//     직장:{
//         이름:"경일 게임 아카데미",
//         주소: "서울특별시 강동구 천호대로 995 금복빌딩 3,4층",
//         전화번호:"024794050",
//     },
// }

const parser = (data) => {
  const lines = data.split("\r\n");
  // 요청에 포함된 데이터는 각 줄마다 뜻하는 설정이있다.
  // 그래서 줄로 나눈다.

  //
  // GET /?name=ssm HTTP/1.1
  // Content-Type: application/json
  // User-Agent: PostmanRuntime/7.30.0
  // Accept: */*
  // Postman-Token: 1541c2f7-a4e1-4d34-86bc-a7ff5aa9be1b
  // Host: localhost:4193
  // Accept-Encoding: gzip, deflate, br
  // Connection: keep-alive
  // Content-Length: 24
  //

  console.log(lines);
  const firstLine = lines.shift().split(" "); //GET /?name=ssm HTTP/1.1
  //첫번째 줄은 요청을 보낼때 사용한 형식(method), 주소(라우터,url), 프로토콜의 버전(version)이 ' '를 사이에 두고 연결되어있다

  console.log("firstLine", firstLine);
  const method = firstLine[0];
  const url = firstLine[1];
  const version = firstLine[2];
  // ' '를 기준으로 나눠 각 데이터를 객체에 넣어 반환할수있게한다.
  console.log("method", method);
  console.log("url", url);
  console.log("version", version);

  const path = url.split("?")[0];
  const queryString = url.split("?")[1];
  //url을 라우터(path)와 쿼리스트링(queryString)로 나눈다
  const query = getQuery(queryString);
  // 쿼리스트링은 다시 각 쿼리로 나눠 객체에 담아 반환한다
  console.log("path", path);
  console.log("queryString", queryString);
  console.log("query", query);

  console.log(lines);

  const dataObj = getMessage(lines);

  console.log("dataObj", dataObj);

  return { method, url, version, path, query, ...dataObj };
  // 헤더와 바디를 req하나에 넣기위해서 풀어서넣음 ...dataObj
};

module.exports = parser;

# Back / Front 나누기



## 1.1 Back 구축하기



DB table을 넣기 



```mysql
Mysql> SOURCE /home/ingoo/workspace/220307/cors/back/SQL/table.sql
```



잘들어갔는지 확인해주세요.



```toml
desc [테이블명] # 테이블 필드 조회
desc user
desc board

or

show tabels; # 모든테이블 조회
```



백앤드 실행되는지 확인하기

1. 백앤드 구축 (스키마) + 라우터 
2. 프론트 구축 -> User 회원가입, 로그인 , 프로필 , 토큰인증
3.  구현능력 



## 1.2 Front 구축하기



http://localhost:3001 



GET / : 메인페이지

GET /user/join : 회원가입

GET /user/login : 로그인페이지

GET /user/profile : 프로필 페이지



라우터 생성과 HTML 생성



http://localhost:3001 -> 메인페이지



메인페이지에서 로그인 이동할수있는 버튼을 만들어줍시다.



### 1.1 메인페이지

- 회원가입페이지 이동할수있는 버튼 제작



### 1.2 회원가입 페이지  (/user/join)

- 사용자가 회원정보를 받을수있는 폼을 제작합시다.
- 사용자가 회원정보를 백앤드 (http://localhost:4001) 에 내용을 전달하는 코드를 작성합니다. (axios)



### 1.3 백앤드 (/api/user/join)

- 프론트에서 보내중 내용을 받고,
- DB에 연결을 한다음에. 해당내용을 Insert를 해줍니다.
- 그 결과물을 Front페이지에 응답을 해줍니다.




# 목요일까지 과제

1. 회원가입시 에러가 안나게 하기.
2. try catch 문 사용하기 


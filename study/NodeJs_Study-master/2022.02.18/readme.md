# 데이터베이스 스키마 짜기

CREATE TABLE board (
    [필드명] [데이터타입] 
)

CREATE TABLE board (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(40) NOT NULL,
    content TEXT NULL,
    date TIMESTAMP NOT NULL,
    hit INT NOT NULL
)


NOT NULL <- 값이 존재해야 한다.
NULL 은 "값없음"을 뜻한다.

AUTO_INCREMENT
순서를 만들어 주기 위해 넣는 값이 아니다.
고유한 값을 넣어주기 위해 사용하는 것이 AUTO_INCREMENT


PRIMARY KEY <- 기본키, 중복된 값을 허용하고 싶지 않을 때 사용
특정 필드를 PRIMARY KEY로 하면 그 필드를 이용해 데이터를 유일하게 식별한다.  
기본키는 하나의 테이블 안에서 각 행의 데이터를 유일하게 식별하는데 사용된다.


글자가 고정적으로 들어가는 내용이다. -> CHAR
글자가 유동적으로 들어가는 내용이다. => VARCHAR
VARCHAR(255) -> 맥시멈 사이즈 255/2 대략 127글자..


SELECT == 테이블
SELECT문은 테이블을 만들어 주는 명령어라고 생각하자.
SELECT date_format(date, '%Y') AS year FROM board;
date_format 함수를 사용하면 CURRENT_TIMESTAMP를 string 형태로 변경해서 사용 가능




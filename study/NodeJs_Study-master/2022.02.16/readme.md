# DB
데이터베이스

# DBMS
DBMS - 데이터베이스 관리 시스템 (mySQL, 오라클, MariaDB, ...)
DBMS는 일종의 프로그램. 
MySQL -> 왜 써야할까? 데이터를 하드디스크에 저장하기 위해서,, 메모리는 휘발성이기 때문에 컴퓨터를 껐다 키면 데이터가 날라간다.
반면 하드디스크는 비휘발성이기 때문에 컴퓨터가 꺼졌다 켜져도 데이터가 유실되지 않는다.

웹서버도 프로그램(하나의 프로세스), DBMS도 프로그램(하나의 프로세스). 프로세스들 간에는 컴퓨터의 자원을 공유할 수 없다. (각각 다른 프로세스는 자원을 공유할 수 없다.)
공유를 하고 싶을 때 사용하는 것이 바로 통신이다. 포트를 통해 서로간의 연결통로를 만들어 준다.
그렇기 때문에 내 컴퓨터 안에 있는 프로그램들 임에도 불구하고 웹서버랑 DB는 서로 통신을 한다. (통신을 통해 데이터를 주고 받는다.)
npm install mysql을 이용해 express와 MySQL 서버가 통신할 수 있게끔 해주는 라이브러리 설치

user : 사용자명
password : 패스워드
database : 내가 접속할 데이터베이스명
ip주소 <- 내컴퓨터에 있는 mySQL에 접속할건지 아니면 외부서버에 있는 mysql에 접속할 건지 설정해줘야 한다.
접속까지 완료한 건 아님, 접속할 정보를 담아놓은 것

DB도 하나의 서버로 볼 수 있다. DB Server
우리는 wsl에서 DBMS를 설치할 것.

Nodejs에서 DB와 통신을 도와주는 라이브러리 -> mySQL, mySQL2 : npm으로 설치 가능
SQL -> DBMS에서 데이터를 다루기 위한 문법.

mysql 시스템 안에는 계정(user)에 대한 시스템이 존재한다. 계정별로 다른 데이터를 저장하고 볼 수 있다.
root 계정 -> 최고관리자
root계정이 사용할 수 있는 공간 -> 데이터베이스 : 여러가지 정보를 저장할 수 있는 공간
데이터베이스 안에서 테이블 단위로 데이터들을 관리

<명령어>
기본적으로 mySQL 구문은 뒤에 세미콜론을 붙여야 한다.
SHOW DATABASES; 데이터베이스들을 보기 위한 명령어, 기존에 존재하는 데이터베이스들은 mySQL의 설정을 바꿀 수 있는 데이터베이스들,,
USE [데이터베이스명]; 데이터베이스를 선택하는 명령어,
데이터베이스를 선택한 후 SHOW TABLES; 명령어를 통해 데이터베이스 안에 있는 테이블들을 볼 수 있다.

mysql 데이터베이스에 있는 user 테이블을 통해 계정 정보들을 설정할 수 있다.

<SQL 문법 배우기>
SQL 문법을 크게 3가지로 구분.

1. DDL
    - 데이터베이스나, 테이블을 만들 때 씁니다.

2. DML
    - 테이블 안에 있는 데이터를 조작할 때 씁니다. 
    - SELECT문 : 테이블에서 데이터를 가져오는 문법
    - UPDATE문 : 테이블의 내용을 수정할 때 사용하는 문법.
    - DELETE문 : 테이블의 데이터를 삭제할 때 사용하는 문법.
    - INSERT문 : 테이블에 데이터를 추가할 때 사용하는 문법.

3. DCL
    - 권한설정

sql 구문을 작성할 때 DDL, DML, DCL 부분은 대문자로 작성해주는 것이 관습이다.

데이터베이스는 데이터를 테이블 형태로 저장한다. (mySQL에서 데이터를 저장하는 방식)
필드명 : 데이터가 저장된 변수명
레코드 : 한 줄의 내용
테이블명 : 

<SELECT문>
DESC 테이블명; -> 테이블의 필드 정보를 볼 수 있는 명령어 (테이블의 필드 내용 가져오기)
SELECT 필드명 FROM 테이블명;  -> 테이블에서 원하는 필드의 데이터를 가져오는 행위;

WHERE절 : 필드=값;
SELECT 필드명 FROM 테이블명 WHERE 필드="값";
테이블 안에서 원하는 레코드만 가져올 수 있게 해주는 조건문.

<UPDATE문>
UPDATE [테이블명] SET 필드=값, 필드=값;
UPDATE [테이블명] SET 필드=값 WHERE 필드=값;


<DDL 문법>
CREATE DATABASE [데이터베이스명] : 데이터베이스 생성 

root 계정이 아닌 다른 계정의 경우, 권한을 부여해줘야만 한다.



plugin : 패스워드를 저장하는 암호화에 대한 내용


웹서버는 데이터를 메모리에 저장. 영구적으로 가지고 있지 못한다. DB는 데이터를 파일로 저장. 영구적 보관이 가능하다.


##################< MySQL 환경설정>#########################################

루트계정으로 접속한 후
USE mysql  <- mysql 데이터베이스 사용

UPDATE user SET plugin='caching_sha2_password' WHERE User='root';


SELECT user, host, plugin, authentication_string FROM user;


<DCL을 이용해 user 테이블 안에 있는 사용자의 패스워드 변경>

#보안정책 확인
show variables like 'validate_password%';

empty set이 나온다면,,
install plugin validate_password soname 'validate_password.so';
select plugin_name, plugin_status from information_schema.plugins where plugin_name like 'validate%';
입력해서 생성해준다.

set global validate_password_policy=LOW;
set global validate_password_length=4;

패스워드 생성
alter user 'root'@'localhost' identified by 'root';



<계정 생성>
'localhost' -> localhost만 접속가능
'ip' -> 해당 아이피만 접속가능
'%' -> 누구나 접속가능
외부접속 사용자 계정을 추가하고 싶을 때 host를 %로,,

mysql_native_password : express에서 mysql 라이브러리를 사용할 때 통신,,

CREATE user 'bitkunst'@'%' IDENTIFIED WITH mysql_native_password BY 'won0701';

ALTER user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'won0701';

FLUSH PRIVILEGES;   <-  변경사항 적용하기

<mysql 재시작>
sudo service mysql restart

######################################################################

<계정에 권한 부여하기>

grant all privileges on *.* to 'bitkunst'@'%' with grant option;   <- bitkunst 계정에 모든권한 부여


###########################################################################




sudo apt install net-tools  <-  netstat을 보기위해 설치해준 것

sudo netstat -ntlp | grep mysqld   <-  netstat에서 program name이 mysqld인 것만 보겠다는 뜻

0.0.0.0  <- 모든 아이피를 나타냄
127.0.0.1 <- localhost의 아이피


< mysql.cnf 파일 찾기 >
cd /etc/mysql/mysql.conf.d

sudo vi mysqld.cnf
bind-address 부분의 127.0.0.1을 주석처리하고
bind-address = 0.0.0.0 을 넣어준다.

ifconfig 로 ip주소 확인.




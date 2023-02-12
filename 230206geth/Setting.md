# GETH를 위한 세팅

- geth : Go로 구현된 이더리움 서버

# Golang

- Google에서 개발한 프로그래밍 언어(컴파일 언어)
- 이름은 Go 이지만 검색 등에서 불편해서 Golang이라고 부른다.
- 설치

```sh
sudo apt-get install golang
# Mac Os
brew install golang
```

- 버전 확인

```sh
go version
```

- 아래의 프로그램들을 함께 설치하자
  - libgmp3-dev : 다중 정밀도 산술 라이브러리(계산을 도와주는 라이브러리)
  - tree : 디렉토리를 tree 형태로 보여준다.
  - 잘못 사용하면 지옥이다
  - make : 통합 컴파일러, 다양한 언어에 대해서 알아서 build를 해준다.
  - build-essential : build에 필요한 기본 라이브러리들을 제공
  ```sh
  sudo apt-get install libgmp3-dev tree make build-essential
  #Mac Os
  brew install libgmp3-dev tree make
  ```
- tree 라고 치면 디렉토리 다보여준다

# Go-Ethereum

- Geth
- 이더리움에서 제공하는 공식 소프트웨어
- 설치

```sh
git clone https://github.com/ethereum/go-ethereum
```

- mkdir geth : geth폴더 만듬
- cd ~ 최상위 루트로 이동한다음 geth폴더 그안에 설치
- cd .. cd geth등으로 들어가서
- git clone https://github.com/ethereum/go-ethereum 설치
- cd go-ethereum 폴더로들어옴

- 빌드
- go-ethereum 폴더에서 실행

```sh
make geth
```

- 설치하면 build폴더에 bin폴더에 geth라는게 생김

- geth 실행
- go-ethereum/build/bin 폴더 내의 geth 실행

```sh
./geth
```

//./geth로 실행

-./는 현재경로

# 생성한 geth를 위치에 상관없이 명령어로 사용할 수 있도록 하자

- build/bin으로 들어감

-pwd 입력후

- cd ~ 계정의 홈주소

- pwd로 확인한 geth의 경로
- /home/ssm/geth/go-ethereum/build/bin
- /home/ssm/geth/go-ethereum/build/bin
- 파일 하나를 만들자
  - 이름은 .bash_profile
  - 방법은 vi
  - 내용은 아래와 같다
  ```
  export PATH=$PATH:/home/ssm/geth/go-ethereum/build/bin
  ```

```sh
vi ~/.bash_profile
```

- vi ~/.bash_profile 여기로 들어간다음 i누르면 insert 나오고 입력가능

  - 수정완료시 esc => :wq! => 엔터
  - ubuntu home ssm bash profile을 메모장으로 열어서확인가능

- source 가 vi쳐서 환경 설정해줘야 저장이된다

```sh
source ~/.bash_profile
```

- bash:환경설정파일

이거 치면 이제 geth가능

- ./geth대신 geth로 쳐도 되게하는 방법

- 이후에 어디서든지 geth 명령어로 geth 실행가능

- wsl을 치면 로컬 우분투깔려있는거로 접속

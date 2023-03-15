# WSL

### Go 설치

```shell
$ sudo apt install
$ sudo apt install golang
```

<br>

### 빌드 작업을 위해 설치

```shell
$ sudo apt install -y libgmp3-dev tree make build-essential
```

<br>

### Go 버전 업데이트

```shell
$ git clone https://github.com/udhos/update-golang

$ cd update-golang

$ sudo ./update-golang.sh
```

<br>

### 설치할 디렉토리 설정 & go-ethereum git clone 받기

```shell
$ cd ~
$ mkdir Ethereum
$ cd Ethereum
```

```shell
$ git clone https://github.com/ethereum/go-ethereum

$ cd go-ethereum
$ make geth
```

<br>

### geth 버전 확인

```shell
$ cd go-ethereum

$ cd ./build/bin
$ ./geth version
```

<br>

### geth 실행 ( ./build/bin 디렉토리 안에서 )

```shell
$ ./geth
```

<br>

### 환경 변수 설정

```shell
$ # ./build/bin 디렉토리 절대경로 확인
$ pwd
/home/bitkunst/geth/go-ethereum/build/bin
```

```shell
$ vi ~/.bash_profile

$ # 편집
export PATH=$PATH:/home/bitkunst/geth/go-ethereum/build/bin
$ # wq! 저장 후 종료하기

$ source ~/.bash_profile
```

<br>
<br>

# MacOS

### Go 설치하기

```shell
$ brew update
$ brew install golang
```

### 버전 확인

```shell
go version
```

<br>

### 설치할 디렉토리 설정 & go-ethereum git clone 받기

```shell
$ cd ~/workspace/ethereum

$ git clone https://github.com/ethereum/go-ethereum

$ cd go-ethereum

$ make geth
```

> 혹시 맥에서 make 명령어가 안된다면 xcode 가 설치되어야 하는데,
> <br>
> xcode-select --install 명령어를 실행하면 된다.

<br>

### geth 버전 확인하기

```shell
$ geth version

$ # zsh: command not found: geth
$ # 와 같은 내용으로 실행이안된다면,

$ cd ./build/bin
$ ./geth version
$ # 으로 확인해보자.
```

<br>

환경변수가 설정되어 있지 않아서 geth를 찾지 못한 것이므로,
<br>
환경변수를 설정해주도록 하자.
<br>
즉, geth 명령어를 입력하면 ~/workspace/ethereum/go-ethereum/build/bin/geth 를 실행할 수 있도록 환경변수를 설정해주자.
<br>

### 환경변수 설정하기

```shell
$ pwd
/Users/ingoo/workspace/ethereum/go-ethereum/build/bin

$ vi ~/.bash_profile

export PATH=$PATH:/Users/ingoo/workspace/ethereum/go-ethereum/build/bin
$ # !wq 저장후 종료하기

$ source ~/.bash_profile
```

<br>
<br>

# ganache

로컬에서만 실행되는 이더리움 (테스트 용도)

```shell
$ npm install -g ganache-cli
```

- 채굴 기능 X
- P2P 기능 X
- 블록 / 체인 / Tx 기능만 존재

1 tx -> 1 block
<br>
트랜잭션을 발생시키면 실시간으로 바로 확인할 수 있는 로컬 이더리움
<br>
dev 서버 같은 느낌,,

```shell
$ # 실행 명령어

npx ganache-cli
```

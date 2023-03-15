NVM : Node Version Manager?
nodejs 버전을 관리해주는 매니저

# NVM 설치

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

cd ~ 
1. 홈 디렉토리에 .nvm 폴더가 있는지 확인하기
2. macOS .zshrc  /  windows .bashrc vi 에디터로 열기
3. source ~/.bashrc 입력 후
4. nvm --version 을 이용해 버전이 출력되는지 확인 

홈 디렉토리 : cd ~
루트 디렉토리 : cd /

# nodejs 버전 업
nvm install --lts 입력
node -v로 버전 확인

cd ~/workspace/node
pwd
/home/[사용자명]/workspace/node

---------------------------------------------------

node 입력해서 node 실행하기

read evaluate print loop -> RELP
```REPL
> 화살표가 뜸

```

```js
파일로 실행하기
node [파일명]
// server.js
console.log("hello node")
```

NPM : nodejs package manager
nodejs를 설치하면 패키지 매니저가 자동으로 설치되어 있다.
npm -v로 확인

express
NodeJS 에서 실행할 수 있는 웹서버를 구축하기 위한 라이브러리

패키지 === 라이브러리
웹서버를 만들고자 할 때 한 폴더에 웹서버를 구축할 수 있는 코드들을 담아놓았다.
압축 (패키지화 했다)
특정 폴더에 코드들을 꾹꾹 담아놓아서 패키지화 한 것


패키지를 다운 받아서 라이브러리를 사용하겠다 라고 표현 

express 패키지 다운로드

npm init 
output : package.json
코드를 작성한 디렉토리에 package.json 파일이 생성된다.

-- npm을 사용할 준비가 되었다.
-- 패키지를 설치할 준비가 되었다.

> npm install <패키지명>
> node_modules 폴더가 생성됩니다. 어디에?
> npm install을 실행한 디렉토리에 생성됨.

> npm install express

node_modules를 확인하기 위해서 ls-al 입력

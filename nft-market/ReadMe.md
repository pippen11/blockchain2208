- front

```bash
yarn create react-app front --template typescript
cd front
yarn add web3 axios @metamask/providers

```

- MetaMaskInpageProvider가 타입이다 react-app-env.d.ts에서 ethereum타입 지정해준다, 다른곳에 해도되긴함

- back

```bash
npm init -y
npm i express dotenv @openzeppelin/contracts @remix-project/remixd cors multer @pinata/sdk
npm i web3 axios
npm i web3-utils
npm i -D @types/node nodemon @types/express @types/multer  prettier-plugin-solidity tsconfig-paths
```

-typescript

```bash
npm list -g
# typescript, ts-node 없을 시 설치
npm i -g typescript ts-node

```

- back 폴더안에 tsconfig.json파일 만들어주고 파일내용 가져와서 넣는다

- back 폴더의 package.json
  scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "node ./build/index.js",
  "start:dev": "nodemon --watch \"src/\*_/_.ts\" --exec \"ts-node\" src/index.ts"
  }

- "start": "node ./build/index.js",
  "start:dev": "nodemon --watch \"src/\*_/_.ts\" --exec \"ts-node\" src/index.ts"
  이거 추가해주면 npm run start:dev이걸로 실행가능하다

# Front

# API Server

# Solidity

```bash
npx remixd -s . --remix-ide https://remix.ethereum.org
```

// NFTToken배포하고 그 CA를 가져다가 SaleToken에 배포할때 넣어준다

- remix연결하고 컴파일 돌리면 artifacts폴더가 생긴다 그안에 .json파일이 생김(abi를 가져다쓸꺼다 deploy쓰려고)

# Pinata(IPFS)

#

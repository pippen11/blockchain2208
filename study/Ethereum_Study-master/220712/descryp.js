const keythereum = require('keythereum');
const path = require('path');
const address = '0x65555766ecd47f2e7a596a7da929fa5d3f1dc28d'; // UTC-- 파일 안의 address 값 앞에 0x 붙여서 사용
const dir = path.join(__dirname); // keystore 상위 디렉토리 까지만 경로를 잡아주면 된다.

// UTC-- 파일(keystore 파일)을 복호화해서 개인키 가져오기 , 개인키가 양방향 암호화된 파일

const keyObject = keythereum.importFromFile(address, dir); // UTC 파일 안에 있는 계정 정보 객체
const privateKey = keythereum.recover('1234', keyObject).toString('hex'); // passphrase 와 UTC 파일 안의 객체를 인자값으로 전달하면 복호화 가능
console.log(privateKey); // 0x943367addb42bb5010f70cbd495bae6b457bd8f17b202702456364dcdb50a9ee

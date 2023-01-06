//npm init -y

//설치명령어
//-------------------------------------------------------
//npm i merkle crypto-js hex-to-binary
//---------------------------------------------------------

// 라이브러리들을 가져오고
const merkle = require("merkle");
const SHA256 = require("crypto-js").SHA256;
//ㅇ어제처럼 ("crypto-js/sha256")이런식으로써도됨
//암호화
const hexToBinary = require("hex-to-binary");
//hex 방식(0~F)16진수방식으로 지정된 데이터를 바이너리 방식의 (0~1) 2진수으로 변환시켜준다

//난이도 조절용 수치를 미리 정해놓고 블록 생성 시간을 조절하기 위해서

//최초블록에서 10번째 블록까지는 난이도가 0
//생성되는 블록의 21번째부터 난이도 수치가 조절 될수있게
//처음 10개는 제외하고 11~20 시간차이를 구해서

const TIME_UNIT = 60 * 1000;
//1분을 뜻한다.

const DIFFICULTY_ADJUSTMENT_INTERVAL = 10;
// 난이도 조절에 대한 단위 개수, 난이도를 변경하는 기준이다.
// 최초블록에서부터 이수치까지는 난이도를 0으로 준다.

const BLOCK_GENRATION_INTERVAL = 10;
// timeunit*BLOCK_GENRATION_INTERVAL 하면 한블록 생성시간이 된다

//블록 10개를 만드는데 걸리는 시간 100분
//1에 대한 시간 단위(1분=60초*1000 밀리초)

module.exports = {
  lib: {
    merkle,
    SHA256,
    hexToBinary,
  },
  constant: {
    DIFFICULTY_ADJUSTMENT_INTERVAL,
    BLOCK_GENRATION_INTERVAL,
    TIME_UNIT,
  },
};

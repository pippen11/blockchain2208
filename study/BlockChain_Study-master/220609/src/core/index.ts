import { a } from '@core/utils/utils';
import hexToBinary from 'hex-to-binary';
import SHA256 from 'crypto-js/sha256';

// console.log(a)

// hash hex (16진수) -> 2진수
// 16진수로 이루어진 문자열을 2진수로 변환해줘야 한다.
// 0 1 2 3 4 ~ 9 A B C D E F
/*
    16
    0 -> 0000
    1 -> 0001
    2 -> 0010
*/

const hash: string = SHA256('ingoo').toString();
const binary: string = hexToBinary(hash);

console.log(binary);

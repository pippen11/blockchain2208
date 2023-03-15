// TypeScript interface

// const board = [
//     {
//         idx: 1, // number
//         subject: '글제목', // string
//         content: '내용', // string
//         writer: '작성자', // string
//         hit: 0, // number
//     },
//     {
//         idx: 2,
//         subject: '글제목',
//         content: '내용',
//         writer: '작성자',
//         hit: 0,
//     },
// ];

// JavaScript
// array, object : 하나의 변수에 여러가지 데이터를 넣을 수 있다.

// TypeScript interface
// 객체 안에 들어갈 속성들의 타입을 지정해 주는 방식.
// interface에 맞게 객체 형태를 만들어 줘야 한다.
// interface : 객체의 타입을 지정하는 방식

interface IBoard {
    idx: number;
    subject: string;
    content: string;
    writer: string;
    hit: number;
}

const data: IBoard = {
    idx: 1, // number
    subject: '글제목', // string
    content: '내용', // string
    writer: '작성자', // string
    hit: 0, // number
};

const example: number[] = [1, 2, 3, 4];
const board: IBoard[] = [
    {
        idx: 2,
        subject: '글제목',
        content: '내용',
        writer: '작성자',
        hit: 0,
    },
];

function isSome(num: number): Failable<string, string> {
    if (num !== 5) return { isError: true, error: `${num}은 틀렸습니다.` };
    return { isError: false, value: `${num}이 맞습니다.` };
}

const result = isSome(1);

if (result.isError) console.log(result.error);

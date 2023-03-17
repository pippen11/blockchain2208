// Typescript
// OOP

// interface

// const board = [
//     {
//         idx: 1, //number
//         subject: '글제목입니다.', // string
//         content: '내용입니다.', // string
//         writer: '작성자입니다', // string
//         hit: 0, // number
//     },
//     {
//         idx: 2,
//         subject: '글제목입니다.',
//         content: '내용입니다.',
//         writer: '작성자입니다',
//         hit: 0,
//     },
// ]

// Javascript

// array object
// 하나의 변수에 여러가지 데이터를 넣을수있다.

// {
//     idx: 1, //number
//     subject: '글제목입니다.', // string
//     content: '내용입니다.', // string
//     writer: '작성자입니다', // string
//     hit: 0, // number
// }

interface IBoard {
    idx: number
    subject: string
    content: string
    writer: string
    hit: number
}

// const data: Object = {
//     idx: 1, //number
//     subject: '글제목입니다.', // string
//     content: '내용입니다.', // string
//     writer: '작성자입니다', // string
//     hit: 0, // number
// }

const data: IBoard = {
    idx: 0,
    subject: '글제목이다',
    content: '내용이다',
    writer: 'web7722',
    hit: 0,
}

const example: number[] = [1, 2, 3, 4]
const board: IBoard[] = [
    {
        idx: 0,
        subject: '글제목이다',
        content: '내용이다',
        writer: 'web7722',
        hit: 0,
    },
    {
        idx: 0,
        subject: '글제목이다',
        content: '내용이다',
        writer: 'web7722',
        hit: 0,
    },
    {
        idx: 0,
        subject: '글제목이다',
        content: '내용이다',
        writer: 'web7722',
        hit: 0,
    },
    {
        idx: 0,
        subject: '글제목이다',
        content: '내용이다',
        writer: 'web7722',
        hit: 0,
    },
    {
        idx: 0,
        subject: '글제목이다',
        content: '내용이다',
        writer: 'web7722',
        hit: 0,
    },
]

// boolean

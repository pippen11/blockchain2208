//array;

const animal = ["lion", "bear", "monkey"];

animal.push("deer");

animal.unshift("hippo");
// console.log(animal);

animal.pop();

// console.log(animal);
animal.shift();

// console.log(Array.isArray(animal));

// console.log(animal.indexOf("monkey"));

// console.log(animal.splice(1, 2));
// splice 1번인덱스에 2개 뺀다
// console.log(animal);

const animalone = ["lion", "bear", "monkey", "bird"];

const birdIndex = animalone.indexOf("bird");
// indexOf는 몇번째인덱스인지 알려줌

// console.log(animalone.splice(birdIndex, 1));

////////////////////////////////////////////////////////////////

//Object

const monkey = {
  name: "ringo",
  face: "funny",
  age: 11,
  food: ["banana", "apple", "strawberry"],
  tail: true,
  location: {
    country: "Congo",
    place: "forest",
    isAfrica: true,
  },
};

// console.log(monkey.food[0]);
// console.log(monkey.location.place);

monkey.name = "star";

monkey.food[1] = "melon";
// console.log(monkey);

monkey.weight = 50;

// console.log(monkey);

// JSON은 앞에 키값을 " "로 묶어줘야함

const monkeyJSON = JSON.stringify(monkey);

// console.log(monkeyJSON);
//{"name":"ringo","face":"funny","age":11,"food":["banana","apple","strawberry"],"tail":true,"location":{"country":"Congo","place":"forest","isAfrica":true}}

const monkeyJSONParse = JSON.parse(monkeyJSON);

// console.log(monkeyJSONParse);

const animals = [
  { name: "lion", size: "big", isAggressive: true, weight: 200 },
  { name: "monkey", size: "medium", isAggressive: true, weight: 30 },
  { name: "cat", size: "small", isAggressive: false, weight: 10 },
  { name: "rat", size: "small", isAggressive: false, weight: 2 },
];

// for (let i = 0; i < animals.length; i++) {
//   console.log(animals[i]);
// }

// for (let animal of animals) {
//   console.log(animal);
// }

const animalsNames = animals.map((item, index) => {
  return `Animals name is ${item.name} and size is ${item.size}`;
});

// console.log(animalsNames);

const smallAnimals = animals.filter((item, index) => {
  return item.size === "small";
});

// console.log(smallAnimals);

const numbers = [1, 10, 11, 23, 444];

// const total = numbers.reduce((acc, cur) => {
//   console.log(acc, cur);
//   return acc + cur;
// }, 0);
// console.log(total);

const totalWeight = animals.reduce((acc, cur) => {
  return acc + cur.weight;
}, 0);

// console.log(totalWeight);

const animalss = "lion";

const food = animalss === "lion" ? "meat" : "apple";

// console.log(food);

// const test = "lion";

// switch (test) {
//   case "lion":
//     console.log("1");
//     break;
//   case "monkey":
//     console.log("2");
//     break;
//   default:
//     console.log("testend");
//     break;
// }

// function add(a, b) {
//   return a + b;
// }

// const sum = add(10, 20);

// console.log(sum);

const add = (b) => b + 5;
// 매개변수가 하나일때는 이렇게 생략가능

// console.log(add(10));
////////////////////////////////////////////

class Song {
  constructor(title, writer, singer, released) {
    this.title = title;
    this.writer = writer;
    this.singer = singer;
    this.released = new Date(released);
  }
  getReleasedDay() {
    return this.released.getDay();
  }
  getSongInfo() {
    return `제목: ${this.title}, 작곡: ${this.writer}, 가수: ${this.singer}`;
  }
}

// // 인스턴스
const song1 = new Song("love yourself", "eminem", "eminem", "1998-07-11");
// const song2 = new Song("hater", "joe", "joe", "2015-11-22");
console.log(song1);
// // console.log(song2);

// // console.log(song1.released.getFullYear());

// console.log(song1.getReleasedDay());
// // console.log(song1.getSongInfo());
// // console.log(song1);

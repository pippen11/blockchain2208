const a = "age";

const obj1 = {
  id: 1,
  name: "sm",
  "my name": "개발",
  [a]: 3,

  geLameNameWithFunction() {
    // console.log("this:", this);
    // console.log(this.name);
  },
  getNameArrow: () => {
    // console.log(this.name);
  },
};

console.log(obj1.id);
console.log(obj1["my name"]);
obj1.geLameNameWithFunction();
console.log(obj1.age);
console.log(obj1[a]);
/////////////////////////////////////////////////

//구조분해할당
const obj2 = {
  id: 2,
  name: "나",
  age: 5,
  habbit: "codding",
};

// const id = obj2.id;
// const name = obj2.name;
// const age = obj2.age;
// const habit = obj2.habbit;
//위아래 코드는 완전히 동일
// const { id, name, age, habbit } = obj2;

const arr = [1, "sm", 3];

// const myIds = arr[0];
// const myNames = arr[1];
// const myages = arr[2];

const [myId, myName, myage] = arr;

global.name = "ingoo"

let foo = () => {
    console.log(this)
}

// function foo () {
//     console.log(this.name)
// }

foo();

console.log(this === module.exports)

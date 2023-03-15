const state = {
    value: '',
    todoArr: []
}

const obj = {
    ...state,
    todoArr: state.todoArr.push('asdf')
}

console.log(obj)
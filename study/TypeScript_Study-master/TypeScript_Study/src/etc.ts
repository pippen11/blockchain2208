
// never
function hello(name: string|number) {
    if (typeof name === "string") {
        name
    } else if (typeof name === "number") {
        name
    } else {
        // 만약 타입이 올바르게 들어온다면 else 코드블록은 작동하지 않는다.
        // else 코드 블록에서 name의 type은 never
        name
    }
}
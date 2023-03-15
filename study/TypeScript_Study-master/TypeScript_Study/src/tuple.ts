// Tuple은 array를 생성할 수 있게 하는데 최소한의 길이를 가져야 하고 특정 위치에 특정 타입이 있어야만 한다. 

// Tuple을 사용하면 항상 정해진 개수의 요소를 가져야만 하는 array를 지정할 수 있다.
// 또한 지정된 순서에 맞는 타입을 가져야 한다.

const player: [string, number, boolean] = ["bitkunst", 20, true]

const player2: readonly [string, number, boolean] = ['ingoo', 30, true]
// readonly 일 경우, 수정이 불가능.

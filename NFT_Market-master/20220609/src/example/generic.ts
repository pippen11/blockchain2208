// 클래스를 왜씀?
// 객체 편하게 생성할라고

export class Output {
    [address: string]: number

    constructor(_address: string, _amount: number) {
        this[_address] = _amount
    }
}

export class Input {
    public signature: string // 772210

    constructor(_output: Output) {
        this.signature = Input.sum(_output)
    }
    // const a:string
    // function ab():string { }
    static sum(_output: Output): string {
        const value: string = Object.values(_output).join('')
        return value
    }
}

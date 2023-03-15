// JavaScript

function log<T>(n: T) {
    // code block
    console.log('result : ', n);
}

// 제네릭 : 타입을 변수로 뺐다고 생각하면 된다.
log<number>(123);

export class Output {
    // 클래스에서 interface를 사용하지 않고 타입 지정하는 방법
    // public address: string;
    // public amount: number;
    [address: string]: number;

    constructor(_address: string, _amount: number) {
        // this.address = _address;
        // this.amount = _amount;
        this[_address] = _amount;
    }
}

export class Input {
    public signature: string;

    constructor(_output: Output) {
        this.signature = Input.sum(_output);
    }

    static sum(_output: Output): string {
        const value: string = Object.values(_output).join('');
        return value;
    }
}

export function txToString<P>(data: P) {
    if (data instanceof Output) {
        const value: string = Object.keys(data).join('') + Object.values(data).join('');
        return value;
    } else if (data instanceof Input) {
        const value: string = Object.keys(data).join('') + data.signature;
        return value;
    }
}

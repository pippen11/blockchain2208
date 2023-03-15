import { Output, Input } from './generic';

// describe 함수는 묶어주는 역할
describe('Class Output 검증', () => {
    // it() 함수 안에 콜백함수로 테스트 코드 작성
    let output: Output;
    let input: Input;

    it('Output 인스턴스 생성 확인', () => {
        output = new Output('7722', 10);
        console.log(output);
    });

    it('Input 인스턴스 생성 확인', () => {
        input = new Input(output);
        console.log(input);
    });

    it('txToString() 구현', () => {
        // console.log(output);
        function txToString<E>(_data: E) {
            // console.log(_data);
            const result = Object.entries(_data);
            const a = result.map((v) => {
                return v.join('');
            });

            return a.join('');
        }

        const inputResult = txToString<Input>(input);
        console.log(inputResult);

        const outputResult = txToString<Output>(output);
        console.log(outputResult);
    });
});

/*
    // Input의 인스턴스 , Output의 인스턴스를 인자값으로 받는 함수 
    txToString()

    // output -> address7722amount10
    // input -> signature772210
*/

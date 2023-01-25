declare type TError<R> = {
  isError: true;
  msg: R;
};
// <R>||<T> << 타입을 가져다 사용(호출)할 때 어떤 타입인지 받겠다. T대신 다른거넣어도됨 타입에게서의 매개변수 제네릭(Generics)
// 타입에서의 매개변수

declare type TResult<T> = {
  isError: false;
  value: T;
};

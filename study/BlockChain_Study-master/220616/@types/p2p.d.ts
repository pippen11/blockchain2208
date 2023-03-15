/**
 *  enum
 *  특정한 타입의 값을 넣고 싶을 때 사용
 */

declare enum MessageType {
    latest_block = 0,
    all_block = 1,
    receivedChain = 2,
}

declare interface Message {
    type: MessageType;
    // data의 경우 다양한 형태로 들어올 수 있기 때문에 any 사용.
    payload: any;
}

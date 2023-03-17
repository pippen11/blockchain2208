declare enum MessageType {
    latest_block = 0,
}

declare interface Message {
    type: MessageType
    payload: any
}

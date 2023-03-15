const webSocket = require('ws')  // 외부 라이브러리 'ws'사용

let sockets = []  // 연결된 소켓을 담을 배열 생성
module.exports = (server) => {

    // 웹소켓 기능 구현
    const wss = new webSocket.Server({ server }) // express와 포트 공유하기
    // const wss = new webSocket.Server({ port: 3001 })  // 포트 나누기

    // 웹소켓에서는 이벤트로 내용을 처리
    // 임의로 이벤트명을 지정할 수도 있지만, 기본적으로 가지고 있는 이벤트명도 존재
    // 커넥션이 일어나는 시점을 잡아서 코딩하기 위해 이벤트를 명시해주는 것 (이벤트 기법)
    wss.on('connection', (ws, req)=>{
        
        // ws 안에는 연결된 클라이언트의 정보가 담겨있다.
        // req에는 처음 커넥션을 맺었을 때의 요청헤더 정보가 담겨있다.
        console.log(req.connection.remoteAddress)

        ws.id = req.headers['sec-websocket-key']
        // websocket-key를 통해 고유한 웹소켓 식별
        sockets.push(ws)

        ws.on('close', (code, reason)=>{
            // code : 연결이 종료되는 이유를 가르키는 숫자
            // 기본값은 1000

            // reason : 왜 종료되는지 사람이 읽을 수 있도록 나타내는 문자열
            // utf-8 포멧 123바이트를 넘을 수 없다.
            console.log('고객이 도망쳤다!!')

            sockets = sockets.filter(v=>{
                console.log(ws.id === v.id)
                return ws.id !== v.id
            })
        })


        // 브라우저로부터 온 메세지 받기
        ws.on('message', (response)=>{
            let obj = JSON.parse(response.toString())
            let {type, data} = obj

            switch(type) {
                case 'send_msg':
                    sockets.forEach( v => v.send(data) )
                break;
            }
        })
    })
}
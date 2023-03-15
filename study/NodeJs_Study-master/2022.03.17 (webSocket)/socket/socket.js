const webSocket = require('ws')  // 외부 라이브러리 

let sockets = []
module.exports = (server) => {
    // 웹소켓 기능 구현
    const wss = new webSocket.Server({ server }) // express와 포트 공유하기
    // const wss = new webSocket.Server({ port: 3001 })  // 포트 나누기

    // 웹소켓에서는 이벤트로 내용을 처리
    // 임의로 이벤트명을 지정할 수도 있지만, 기본적으로 가지고 있는 이벤트명도 존재

    // 커넥션이 일어나는 시점을 잡아서 코딩하기 위해 이벤트를 명시해주는 것 (이벤트 기법)
    // 해당 코드가 없어도 연결은 이루어진다.
    // 기능이 동작하는 것이 아니라 커넥션이 일어난 시점을 잡기 위한 코드
    // ws 안에는 연결된 클라이언트의 정보가 담겨있다.
    // req에는 처음에 커넥션을 맺었을 때의 요청헤더 정보가 담겨있다.
    wss.on('connection', (ws, req)=>{
        console.log(`접속 됐니?`)
        console.log(req.connection.remoteAddress)

        ws.id = req.headers['sec-websocket-key']
        sockets.push(ws)

        console.log(sockets.length)
        
        // code : 연결이 종료되는 이유를 가르키는 숫자
        // 기본값은 1000

        // reason : 왜 종료되는지 사람이 읽을 수 있도록 나타내는 문자열
        // utf-8 포멧 123바이트를 넘을 수 없다.
        ws.on('close', (code, reason)=>{
            console.log('고객이 도망쳤다!!')
            sockets = sockets.filter(v=>{
                console.log(ws.id === v.id)
                return ws.id !== v.id
            })

            console.log(sockets.length)
        })

        // 데이터를 전달할 때는 무조건 string 형태로 전달.
        // 1. 객체만들기
        // 객체로 만들어서 구분값 부여 (event에 따라,,)
        // 구분값을 만들어 주기 위해 객체 형태로 메세지를 작성해서 보낸다.
        // let layout = {
        //     event: 'init',
        //     msg: '클라이언트야 이거 받아봐'
        // }

        // let example = {
        //     event: 'ingoo',
        //     msg: 'hello socket'
        // }

        // let return_msg = {
        //     event: 'return',
        //     msg: '나에게 돌려줘~'
        // }

        // send() 메소드 안에 메세지를 담아서 전달
        // ws.send(JSON.stringify(layout))
        // ws.send(JSON.stringify(example))
        // ws.send(JSON.stringify(return_msg))

        // 브라우저로부터 온 메세지 받기
        ws.on('message', (response)=>{
            let obj = JSON.parse(response.toString())
            let {type, data} = obj

            switch(type) {
                case 'send_msg':
                    sockets.forEach( v => v.send(data) )
                break;
            }
            // console.log(response.toString())
        })
    })
}

// event 내용

// on 듣기
// send 말하기
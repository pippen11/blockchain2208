localhost:3000 을 주소창에 치고 엔터를 누르면 브라우저에서 서버에게 요청을 보내고
서버는 요청을 보낸 클라이언트에게 응답한다.
요청이 들어오면 무조건 한번의 응답을 보내줘야 한다.

이 때 웹브라우저는 아래와 같은 텍스트를 만들어서 웹서버에게 요청을 보내게 된다.

# 헤더 영역
GET / HTTP/1.1
Host: localhost:3000
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:96.0) Gecko/20100101 Firefox/96.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
If-None-Match: W/"12c-rAvXfQATu5XcanT9L/eGAuh6z4E"
Cache-Control: max-age=0

# body 영역
data
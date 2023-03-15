웹서버가 웹브라우저에게 응답할 떄 아래와 같은 텍스트를 만들어서 웹브라우저에게 전달한다.

# 헤더영역
HTTP/1.1 304 Not Modified
X-Powered-By: Express
ETag: W/"12c-rAvXfQATu5XcanT9L/eGAuh6z4E"
Date: Thu, 03 Feb 2022 00:39:02 GMT
Connection: keep-alive
Keep-Alive: timeout=5

# body 영역
data
body 영역에 존재하는 텍스트를 이용해 웹브라우저는 화면을 만들어서 랜더해준다.
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>hello world</h1>
    
</body>
</html>



# AWS 배포

## AWS -> 탄력적 IP
IP를 고정하는 개념.

## AWS -> Route 53 
도메인 내용이 있는 메뉴.

## Nginx
제품 이름. 웹 서버. 리버스 프록시를 할 때 사용.
- 웹 서버를 구축하는데 사용.
- 리버스 프록시

클라이언트와 서버 간의 중간 다리
<br>
서버 컴퓨터 안에 웹 서버가 2개 존재. Ngnix 와 Express
<br>
Nginx가 HTTP 메세지를 Express에게 전달.
<br>
클라이언트가 브릿지 역할을 하는 서버에 요청을 보내면 Nginx는 해당 요청을 우리가 만든 웹서버에 보낸다. 클라이언트와 웹 서버가 다이렉트로 통신하지 않는다. 
<br>
클라이언트가 80번 포트로 요청을 보내면 Nginx가 해당 요청을 3000번 포트에 대한 요청으로 바꿔서 Express에게 전달.

1. React로 웹 서버를 구축하지 않아도 된다.
2. HTTPS 설정이 쉽다.

### Nginx 설치 및 시작
```
sudo apt install nginx  // 설치

sudo service nginx start  // 시작

sudo service nginx stop

sudo service nginx status  // 상태

sudo nginx -t  // default 문법
```

### Nginx 설정
```
cd /etc/nginx/sites-enabled

location / {
    proxy_pass http://127.0.0.1:3000  // 리다이렉트 주소
}
```

### AWS -> 탄력적 IP 
고정 IP 설정하기.


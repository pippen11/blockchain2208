리눅스의 디렉토리 구조를 알아야 한다.
root@Romantiker - 계정명
: 는 구분값
/mnt/c/Users/82102 - 디렉토리

# 리눅스
## 1.1 기본구조
root@Romantiker:/mnt/c/Users/82102#
/mnt/c/Users/82102 디렉토리를 말함

<터미널 명령어>
cd : 구분값은 스페이스바, cd '폴더명' 을 통해 원하는 디렉토리로 들어갈 수 있다.
root@Romantiker:~#
결과물이 ~ 이러한 곳으로 이동되었다.

pwd : 현재 위치가 나온다.
cd를 치고 pwd를 쳤기 때문에 아래와 같은 결과가 나온다.
pwd 가 하나의 입력이고 /root가 하나의 출력이다.
현재 디렉토리가 어디인지를 알려주는 명령어가 pwd

~ : 홈디렉토리
cd ~ , cd 둘다 사용가능. 현재 로그인을 한 사람의 홈디렉토리로 이동하게 된다.
root@Romantiker:~# pwd
/root

ls : 내 폴더 안에(내 디렉토리 안에) 어떠한 폴더들이 있는지(파일 목록들을) 출력해주는 명령어.

mkdir : 디렉토리를 생성해주는 명령어
mkdir '폴더명'

ls -al : 현재 디렉토리에 있는 파일 목록들을 상세히 보여주는 명령어와 옵션
여기서 ls는 명령어, -al은 옵션명
옵션명 앞에는 - 혹은 --가 붙는다.
기본적으로 리눅스 명령어는 아래와 같은 구조를 띠고 있다.
[명령어] [옵션]
pwd       -
ls        --

리눅스에서 앞에 .이 달린 건 숨김 파일이라는 뜻이다.
root@Romantiker:~# mkdir .ingoo2
root@Romantiker:~# ls
ingoo  nodejs

.이 붙어있는 숨김폴더들 까지 확인하고 싶으면
ls에서 -a 옵션을 사용하면 된다.
ls -a : 숨긴 디렉토리까지 보임
ls -l : 자세히 보기 (폴더명, 날짜, 파일크기)
drwxr-xr-x 2 root root 4096 Jan 25 09:29 ingoo
drwxr-xr-x 2 root root 4096 Jan 25 09:31 nodejs

drwxr-xr-x의 뜻은?
d rwx rwx rwx 총 10자리
디렉토리인 경우, 앞에 d가 붙어있다.
파일인 경우, 앞에 -가 붙어있다.
total 32
drwx------  5 root root 4096 Jan 25 09:38 .
drwxr-xr-x 19 root root 4096 Jan 25 09:05 ..
-rw-------  1 root root   20 Jan 24 12:41 .bash_history
-rw-r--r--  1 root root 3106 Dec  5  2019 .bashrc
drwxr-xr-x  2 root root 4096 Jan 25 09:38 .ingoo2
-rw-r--r--  1 root root    0 Jan 25 09:05 .motd_shown
-rw-r--r--  1 root root  161 Dec  5  2019 .profile
drwxr-xr-x  2 root root 4096 Jan 25 09:29 ingoo
drwxr-xr-x  2 root root 4096 Jan 25 09:31 nodejs

.은 자기 자신을 가리키고 ..은 이전 디렉토리를 가리킨다.

----------------------------------------------------------------------

root계정은 #으로 일반계정은 $로 나타난다.

clear : 현재 내가 썼던 모든 출력문들을 지우는 명령어.

윈도우에서 맨 처음 보게 것들은 바탕화면부터 보게된다. 자주쓰는 폴더나 파일들을 바탕화면에 놓고 쓴다. 인터넷 같은 곳에서 다운로드를 했을 때는 다운로드 폴더에 들어가게 된다. 리눅스를 사용할 때도 이러한 디렉토리 구조가 머리속에 그려져야 한다.


## 1.2 리눅스 디렉토리
/ : 최상위 디렉토리 
cd / : 최상위 디렉토리로 이동하기
bitkunst@Romantiker:~$ cd /
bitkunst@Romantiker:/$

물결 표시에서 /로 바뀌었다. 최상위 디렉토리이기 때문에 이전 디렉토리가 없기 때문이다.
bitkunst@Romantiker:/$ ls -al
total 696
drwxr-xr-x  19 root root   4096 Jan 25 10:21 .
drwxr-xr-x  19 root root   4096 Jan 25 10:21 ..
lrwxrwxrwx   1 root root      7 Aug 20 06:39 bin -> usr/bin
drwxr-xr-x   2 root root   4096 Aug 20 06:52 boot
drwxr-xr-x   8 root root   2720 Jan 25 10:21 dev
drwxr-xr-x  95 root root   4096 Jan 25 10:21 etc
drwxr-xr-x   3 root root   4096 Jan 25 10:12 home
-rwxr-xr-x   2 root root 636192 Dec 15 15:49 init
lrwxrwxrwx   1 root root      7 Aug 20 06:39 lib -> usr/lib
lrwxrwxrwx   1 root root      9 Aug 20 06:39 lib32 -> usr/lib32
lrwxrwxrwx   1 root root      9 Aug 20 06:39 lib64 -> usr/lib64
lrwxrwxrwx   1 root root     10 Aug 20 06:39 libx32 -> usr/libx32
drwx------   2 root root  16384 Apr 11  2019 lost+found
drwxr-xr-x   2 root root   4096 Aug 20 06:40 media
drwxr-xr-x   4 root root   4096 Jan 25 10:21 mnt
drwxr-xr-x   2 root root   4096 Aug 20 06:40 opt
dr-xr-xr-x 164 root root      0 Jan 25 10:21 proc
drwx------   2 root root   4096 Aug 20 06:43 root
drwxr-xr-x   8 root root    160 Jan 25 10:21 run
lrwxrwxrwx   1 root root      8 Aug 20 06:39 sbin -> usr/sbin
drwxr-xr-x   6 root root   4096 Aug 20 06:43 snap
drwxr-xr-x   2 root root   4096 Aug 20 06:40 srv
dr-xr-xr-x  11 root root      0 Jan 25 10:18 sys
drwxrwxrwt   2 root root   4096 Jan 25 10:21 tmp
drwxr-xr-x  15 root root   4096 Aug 20 06:42 usr
drwxr-xr-x  13 root root   4096 Aug 20 06:43 var

최상위 디렉토리에는 위와 같은 것들이 있다. 여기서 중요한 폴더명과 하는 역할들을 알아보자.

아래의 디렉토리들이 하는 역할들을 알아놓아야 한다.
usr  :  기본 실행파일, 라이브러리, 헤더파일이 저장되는 공간
tmp  :  임시 폴더 (잠깐 지나가는 애들을 담아놓고 쓴다.)
var  :  중요. 프로그램이 실행된 데이터들과 로그들을 저장하는 공간. (일단 로그란 프로그램을 실행한 모든 console.log들이라고 생각하자)
sbin
srv
dev  :  장치파일이 저장되는 디렉토리
opt  :  추가 패키지가 설치되는 디렉토리 (패키지 : 폴더목록) / 윈도우로 치면 download 폴더
home  :  계정별 디렉토리를 저장하는 공간. (리눅스에서도 계정을 여러개 생성해서 사용할 수 있다)
root  :  최고관리자 (루트계정) 홈 디렉토리
etc  :  리눅스 설정에 필요한 정보 파일을 담는 디렉토리

mnt  :  파일들을 임시적으로 연결할 때 쓰는 디렉토리
(리눅스에서 윈도우 디렉토리를 가고 싶다면, mnt에서부터 시작하면된다. 리눅스 디렉토리와 윈도우 디렉토리를 연결하는 디렉토리. 윈도우 디렉토리 구조도 알고 있어야 들어갈 수 있다.)

가장 많이 사용하게 될 건 etc, home, opt, var 

cd ~ 을 사용하면,
bitkunst@Romantiker:/$ cd ~
bitkunst@Romantiker:~$ pwd
/home/bitkunst

/ (루트디렉토리)
/home/[계정명이랑 같은 디렉토리]/
루트 디렉토리 안에 있는, home 디렉토리 안에 있는, 계정명이랑 같은 디렉토리로 들어온다.

WSL2에서 window디렉토리로 가고 싶다면,
bitkunst@Romantiker:~$ cd /mnt
bitkunst@Romantiker:/mnt$ ls -l
total 0
drwxrwxrwx 1 bitkunst bitkunst 4096 Jan 24 23:56 c
drwxrwxrwt 2 root     root       40 Jan 25 10:18 wsl
bitkunst@Romantiker:/mnt$ cd c
bitkunst@Romantiker:/mnt/c$ ls -l


gui 환경에서 텍스트 파일을 생성할 때 메모장을 사용했다.
리눅스에서는 vi를 사용해야 한다.
vi  :  파일을 생성하는 명령어 (메모장을 여는 명령어)
vi 에는 mode라는 것이 존재 
insert mode로 변경해 줘야 한다. a 혹은 i 를 입력해야한다. insert mode로 바꾼 상태에서 입력을 해야 텍스트가 써진다.
vi editor에서는 입력을 하려면 mode를 변경해야 하고 저장을 할 때도 마찬가지로 mode를 변경해줘야 한다.

<mode를 변경하는 방법>
1. ESC 키를 누른다. 
   -- INSERT -- 모드가 종료됩니다.
2. : 을 칩니다. : 상황에서 아래와 같은 명령어들이 존재한다.
   q  ->  나가기
   w  ->  저장하기
   wq!  ->  저장하고 나가기. 느낌표는 강제적

vi '파일명'

<파일을 열어서 내용을 확인하는 방법>
vi '파일명'을 입력하면된다.
내용을 간단하게 보고 싶은 경우, cat 명령어를 사용하면 된다.
cat '파일명'  ->  출력으로 안에 있는 내용들을 보여준다.

CLI 환경을 사용하는 이유. 29분 20초,,
첫번째, GUI 환경이 CLI에 비해 다루기 쉬운 것은 사실이지만 그만큼 컴퓨터가 처리해야 하는 리소스가 많기 때문에 많은 용량을 차지한다. 그래서 CLI를 사용하게 되면 용량을 최소화하면서 컴퓨터를 구동시킬 수 있다. 이 말은 곧 CLI가 서버컴퓨터에 적합하다는 의미로 해석될 수 있다. 



-----------------------------------------------------------------

curl
리눅스에서 인터넷이라는 것을 해보자.
리눅스에서 curl을 사용해 주소창을 입력하면 HTML, CSS, JavaScript를 가져올 수 있다. 하지만 브라우저에서처럼 랜더를 해주지는 않는다. 
bitkunst@Romantiker:/mnt/c/users/82102/desktop/work/cli$ curl https://google
.com
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://www.google.com/">here</A>.
</BODY></HTML>

curl '주소'  ->  output : HTML, CSS, JavaScript

-------------------------------------------------------------------
--------------------------------------------------------------------

cd ~  :  홈디렉토리로 이동

nodejs란 크롬 v8엔진으로 빌드한 자바스크립트 런타임이다.

리눅스 명령어를 추가한다.
node라는 명령어를 추가할 거에요.

node '파일명'
리눅스가 그걸 실행시켜줄거에요 [런타임]

런타임 : 컴퓨터에서 자바스크립트를 실행해주는 것이다.
내 컴퓨터에 javascript로 작성된 코드가 있는데 nodejs가 local에서 이것을 해석해서 결과물을 출력해준다.

--------------------------------------------------------------------

업데이트 후 nodejs 다운로드
sudo apt update
sudo apt install nodejs


---------------------------------------------------------------------

패키지 매니저,
패키지를 쉽게 다운받을 수 있도록 도와주는 것.

패키지  :  폴더 (목적이 있는 폴더)
프로그램을 실행시킬 수 있는 모든 파일을 담은 디렉토리 (폴더)
어떠한 파일을 실행시키기 위해서는 여러가지의 파일들이 필요하다. 이러한 파일들을 묶어주는 폴더가 존재하는데 이걸 패키지라고 한다.

우분투에서는 apt , apt-get
apt-get이라는 패키지 매니저가 인터넷에서 패키지를 다운받아준다.

---------------------------------------------------------------------

맥OS ))
패키지매니저 -> 폴더를 다운받는 행위 -> 인터넷에서
homebrew 맥에서 사용가능한 패키지매니저고
인터넷에서 폴더를 다운받는다.

윈도우에서는 WSL에 apt , apt-get이 기본적으로 설치되어 있다. 하지만 맥OS에서는 homebrew를 설치해서 다운로드 받아줘야 한다. 

<맥북에서 nodejs 설치하기>
homebrew  ->  맥OS 용 패키지 관리자
homebrew가 하는 역할 : 어떤 특정 url에 있는 폴더를 다운받는 것을 쉽게 해주는 패키지매니저. nodejs에서의 npm과 같은 것.

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" 
터미널에 입력해서 homebrew를 설치해준다. opt 디렉토리에 homebrew가 설치되게 된다. opt는 추가패키지가 설치되는 디렉토리

homebrew를 설치한 후에 nodejs를 다운받아 준다.
brew install node

/opt/homebrew/Cellar/node/ 에 저장되게 된다.



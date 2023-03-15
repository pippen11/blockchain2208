# Git 기초

.git 폴더는 무엇인가요??
    - 커밋이 담겨져 있는 폴더

.git 폴더를 만드는 방법
    - git init

Project 폴더에서 git init을 쓰면 앞으로 프로젝트 폴더를 git으로 관리하겠다는 뜻이다.

commit을 할 때마다 해당 순간을 save하게 된다. 
git은 버전관리를 할 때 전체 내용을 다시 저장하는 것이 아닌 변경된 사항들만을 저장한다.


git 도움을 주는 확장앱 설치
- Git graph

git log
- commit의 히스토리를 볼 수 있는 명령어

HEAD : 현재 내가 바라보고 있는 것

해쉬값 : commit의 이름 


1. gitignore
    - 버전관리를 할 필요가 없는 파일 혹은 디렉토리가 있을 경우, .gitignore 파일 이용
    - 프로젝트 폴더에서 .gitignore 파일을 생성
    - .gitignore 파일 안에 추적하지 않을 파일, 디렉토리명을 작성

git rm -r [파일명] : 로컬과 원격저장소를 다 지움
git rm --cached -r [파일명] : 원격저장소에서만 지움

git clone [github주소] : 코드만 다운받는 것이 아닌 커밋리스트까지 전부 다운
원격저장소의 내용을 가져올 때 최초 1회만 실행

2. reset, revert
    - 커밋을 뒤로 돌아가는 행위
git reset --hard [돌아갈커밋Hash]
git revert [취소할커밋Hash값]

3. branch
    - 커밋을 나누는 행위
브랜치보기
git branch

브랜치생성
git branch [브랜치명]

브랜치 바꾸기
git checkout [브랜치명]


4. merge, rebase
    - 커밋을 합쳐주는 행위
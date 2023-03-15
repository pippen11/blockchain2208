# 커스텀 Hook
함수형이기 때문에 가능한 기법
<br/>
코드 재활용을 용이하게 해주는 방식
<br/>
Custom Hook을 만들 때는 함수명 앞에 use를 붙여줘야 한다.
<br/>
<br/>

# useEffect
생명주기와 비슷한 기능을 한다.
<br/>
componentDidMount, componentDidUpdate, componentWillUnmount,, 와 비슷한 기능을 한다.
<br/>
공식문서에 나와있는 정확한 명칭은 SideEffect (해당 코드들이 사이드에서 돌아간다는 뜻)
<br/>
useEffect() 안에 작성된 코드들을 사이드로 보낸 후 모든 코드들이 실행 완료된 다음에 실행된다.
( componentDidMount )
<br/>
<br/>
단점 : Mount일 때도 실행되고 Update 때도 실행된다. => 조건문을 걸어서 시점을 잡아준다.
<br/>
<br/>

## 폼체크
## 정규표현식
## reduce 메소드


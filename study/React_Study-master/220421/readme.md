# 댓글 CRUD

## children
부모 컴포넌트의 상태를 자식의 자식 컴포넌트에게 전달할 때 사용. (한 다리 건너서 전달할 때)
<br>
children을 사용하기 위해서 컴포넌트 안에 내용을 넣을 수 있는 공간을 만들어 주면 된다.
<br>
<br>
\<Component\>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;여기에 작성된 내용이 children에 들어간다.
<br>
\<Component\/>
<br>
<br>
html의 innerHTML과 유사. { this.props.children } 형태로 내용을 가져와서 사용.
<br>
다른 컴포넌트 라이브러리를 가져와서 사용할 때 children 형식으로 사용.

<br>

## 생명주기 (Life Cycle)
리액트도 모든 컴포넌트가 랜더된 시점에서 이벤트를 걸 수 있다. (DOMContentLoaded 와 유사)
<br> 
그 이벤트명이 바로 componentDidMount
<br>
컴포넌트가 랜더가 된 이후 시점에서 백엔드에 요청을 보내고 백엔드에서 응답이 왔을 때 this.setState를 통해 상태를 바꾼다.
<br>
상태가 바뀌었기 때문에 알아서 리랜더링된다.
<br>
<br>
생명주기 함수

- componentDidMount()  :  최초로 컴포넌트가 랜더가 완료되었을 때
- componentDidUpdate()  :  컴포넌트가 리랜더링 되었을 때 <- 상태가 바뀌었을 때
- componentWillUnmount()  :  컴포넌트가 사라질 때 (socket 종료 시점에서 많이 사용)



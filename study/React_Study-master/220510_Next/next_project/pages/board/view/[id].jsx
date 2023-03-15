// board/view/1
import { useRouter } from 'next/router'
// useRouter를 사용해서 1을 가져올 수 있다.

const View = (props) => {

    console.log('hello front')

    const router = useRouter()

    return (
        <>
            <h2> {router.query.id} </h2>
            <h2> {props.name} </h2>
            View Page
        </>
    )
}

// 컴포넌트가 랜더될 때 getServerSideProps() 함수 먼저 실행
// props값을 View component의 props로 전달.
// web sever에서 돌아가는 코드
// 서버에서 실행할 코드와 프론트에서 실행할 코드를 같이 넣을 수 있다.
// 컴포넌트를 완성하기 전에 데이터를 먼저 받고 컴포넌트를 랜더해준다.
// return 값으로는 props를 반환.
// view 페이지에서 주로 사용.

export function getServerSideProps(context) {

    console.log(context)
    console.log(context.query.id)
    console.log('hello server')
    // axios

    return {
        props: {
            name: 'ingoo'
        }
    }
}

export default View;
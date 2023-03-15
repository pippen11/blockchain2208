// _app.jsx 파일

import DefaultLayout from "../components/DefaultLayout";
import 'antd/dist/antd.css'
// Ant Design에서 전역으로 사용할 css 가져오기

const App = ({ Component, pageProps }) => {
    return (
        <>
            여기는 무조건 실행됨.
            페이지 레이아웃들
            글로벌적인 CSS들
            <br />
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </>
    )
}

export default App;
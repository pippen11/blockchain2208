const path = require('path')  
// nodejs 환경에서 돌아가기 때문에 nodejs 내장 패키지를 가져올 수 있다.
const webpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
// npm install로 설치한 패키지 역시 가져올 수 있다.

module.exports = {
    // name은 webpack의 이름
    name: 'react-project',

    // mode는 개발모드인지 production 모드인지 등을 구분
    mode: 'development',

    // 어떤 확장자명을 사용할 것인지 명시해줄 수 있다.
    // resolve의 extensions에는 번들할 파일의 확장자 명시
    // 특정 확장자 내용을 제거할 수도 있다.
    // 확장자명 뿐만 아니라 라이브러리도 명시 가능
    resolve: {
        extensions: ['.js', '.jsx']
    },

    // 내가 앞으로 번들 할 파일들
    entry: {
        // index.jsx 기준으로 require한 것들 전부를 가져오기 때문에 최초 실행 파일명만 입력해주면 된다. 
        // 진입점 파일
        app: ['./src/index.jsx']
    },

    // 모듈의 내용을 합쳐서 내보내게 된다.
    // entry는 받을 거, output은 내보낼 거
    // module은 받으면서 추가적으로 더 넣을 것
    module: {
        // rules 속성은 배열로 받는다.
        // rules 안에서 객체 형태로 내용을 받는다.
        // 여러가지의 rule로 바벨을 사용하겠다.
        rules: [{
            // 확장자가 js 이거나 jsx 일 때 (정규식) babel을 넣는다.
            test: /\.jsx?/,
            loader: 'babel-loader',  // webpack과 babel을 연결해주는 babel 라이브러리
            // babel에 대한 옵션내용 추가
            options: {
                presets: [
                    ['@babel/preset-env', {  // babel/preset-env의 옵션 설정
                        targets: {
                            browsers: [  // browserslist에 알맞는 텍스트 형태로 입력
                                'last 2 chrome versions',
                                '> 5% in KR'
                            ]
                        },
                        debug: true
                    }],  // 옛날 브라우저에서도 환경에 맞게 실행해주는 옵션
                    '@babel/preset-react'  // JSX 사용하기 위해
                ],
                // babel에 대한 plugin
                plugins: [
                    'react-refresh/babel'
                ]
            }
        }]
    },

    // webpack 전체에 대한 plugin
    plugins: [
        new webpackPlugin()
    ],

    // 내보낼 파일의 위치와 파일명 (번들 한 파일) 
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public')  // index.html 파일 위치
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true  // 새로고침 적용
    },

}
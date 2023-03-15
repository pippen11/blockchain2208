const path = require('path')  
const webpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {

    name: 'react-project',
    mode: 'development',

    // 확장자 내용을 제거 혹은 특정 확장자만 사용하겠다.
    resolve: {
        extensions: ['.js', '.jsx']
    },
    
    // entry는 받을 거, output은 내보낼 거
    // module은 받으면서 추가적으로 더 넣을 것
    // entry : 번들할 대표 파일 하나.
    entry: {
        app: ['./src/index.jsx']
    },

    // module에 내용을 추가하는 것이 plugin
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',  // webpack과 babel을 연결해주는 babel 라이브러리
            options: {
                // presets: ['@babel/preset-env', '@babel/preset-react']
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
                // babel에 대한 plugin (babel에 내용 추가)
                plugins: [
                    'react-refresh/babel'
                ]
            }
        },
        {
            test: /\.css$/,
            // use: [MiniCssExtractPlugin.loader, 'css-loader']
            // 옵션값을 넣어주고 싶다면 아래와 같이 객체 안에 담아서 작성
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    //
                }
            },
            'css-loader'
            ]
        }]
    },

    // 전체에 대한 plugin
    plugins: [
        new webpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'style.css' })  // css 파일 생성해주는 plugin
    ],

    // 내보낼 파일의 위치와 파일명 (번들 한 파일) 
    // 내보내기 전에 module과 plugins이 실행됨.
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true  // 새로고침 적용
    },

}
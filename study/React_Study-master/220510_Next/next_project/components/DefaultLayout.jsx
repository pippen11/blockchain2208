import Link from 'next/link'
// 링크를 걸기 위한 컴포넌트

import { Menu, Row, Col } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const DefaultLayout = ({children}) => {
    return (
        <>
            <div>
                {/* <ul>
                    <li><Link href='/'>HOME</Link></li>
                    <li><Link href='/about'>ABOUT</Link></li>
                    <li><Link href='/board/list'>BOARD</Link></li>
                </ul> */}
                <Menu theme='dark' mode='horizontal'>
                    <Menu.Item icon={<MailOutlined />}><Link href='/'>HOME</Link></Menu.Item>
                    <Menu.Item icon={<AppstoreOutlined />}><Link href='/about'>ABOUT</Link></Menu.Item>
                    <Menu.Item><Link href='/board/list'>BOARD</Link></Menu.Item>
                    <Menu.SubMenu title="sub menu">
                      <Menu.Item>item 3</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
                <Row>
                    <Col span={24} style={{background: 'red'}}>asdf</Col>
                </Row>
                <Row justify='end'>
                    <Col span={12} style={{background: 'blue'}}>asdf</Col>
                </Row>
                <Row justify='center'>
                    <Col span={6} style={{background: 'yellow'}}>asdf</Col>
                </Row>
            </div>
            <div>
                {children}
            </div>
            <div>
                여기는 풋터
            </div>
        </>
    )
}

export default DefaultLayout;
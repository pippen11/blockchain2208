import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Search from './Search';

import styled from 'styled-components';

const Layout = styled.div`
    margin-top: 30px;
    width: 100%
    height: 10%;
    display: flex;
    justify-content: space-evenly;
`;

const Logo = styled.h1`
    width: 15%;
    height: 10%;
`;

const NavList = styled.li`
    list-style: none;
    font-size: 25px;
    margin: 0 auto;
`;

const NavBar = styled.ul`
    width: 30%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
`;

const Header = () => {
    return (
        <Layout>
            <Logo>
                <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                    The Explorer
                </Link>
            </Logo>
            <Search to="/" />
            <NavBar>
                <NavList>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                        Home
                    </Link>
                </NavList>
                <NavList>
                    <Link to="/blocks" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                        Blocks
                    </Link>
                </NavList>
                <NavList>
                    <Link to="/transactions" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                        Transactions
                    </Link>
                </NavList>
            </NavBar>
        </Layout>
    );
};

export default Header;

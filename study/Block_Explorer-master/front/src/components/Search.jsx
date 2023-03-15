import React from 'react';
import styled from 'styled-components';
import styles from '../public/Search.module.css';
import { useNavigate } from 'react-router-dom';
import searchData from '../utils/searchData';

const SearchBox = styled.div`
    width: 35%;
    height: 50px;
    border: 3px solid;
    border-radius: 10px;
    margin: auto 0;
`;

const Search = ({ to, ...rest }) => {
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const { selected, inputData } = e.target;

        const result = await searchData(selected.value, inputData.value);

        if (result.error === 1) {
            to = '/notFound';
            navigate(to);
        } else {
            to = '/found';
            navigate(to, { state: result });
        }
    };

    return (
        <SearchBox>
            <form className={styles.form} onSubmit={submitHandler}>
                <select id="selected" className={styles.select}>
                    <option value="address">Address</option>
                    <option value="blockNum">Block</option>
                    <option value="txHash">Tx Hash</option>
                </select>
                <input id="inputData" placeholder="Search by Address / Block / Tx Hash" className={styles.input} />
                <input type="submit" className={styles.btn} value="search" />
            </form>
        </SearchBox>
    );
};

export default Search;

import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Header = () => {
    return (
        <header>
            <h1>Crypto Dashboard</h1>
            <h2><Link to={"/"}>Bekijk Coins</Link></h2>
            <h2><Link to={"/market-share"}>Bekijk Marktaandeel</Link></h2>
        </header>
    );
};

export default Header;
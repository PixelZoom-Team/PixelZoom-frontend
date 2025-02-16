import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <Wrapper>
            <Logo to="/">PIXELZOOM</Logo>
            <Links>
                <NavLink to="/about">ABOUT</NavLink>
                <NavLink to="/articles">ARTICLES</NavLink>
            </Links>
        </Wrapper>
    );
};

const Wrapper = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 50px;
    background-color: #1e1e2e;
    border-bottom: 2px solid #444;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 15px;
    }
`;

const Logo = styled(Link)`
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    flex-shrink: 0;
`;

const Links = styled.div`
    display: flex;
    justify-content: center;
    flex-grow: 1;
    gap: 100px;
    margin-left: -100px;

    @media (max-width: 768px) {
        gap: 20px;
        margin-top: 10px;
    }
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
        color: rgb(216, 186, 240);
        transform: scale(1.1);
        cursor: pointer;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export default Navbar;

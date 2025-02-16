import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    const handleDownload = (event) => {
        event.preventDefault(); // 기본 링크 동작 방지
        const link = document.createElement('a');
        link.href =
            'https://file.notion.so/f/f/da14c526-1912-42bc-96f1-4c567b4b952e/c22794f0-081a-4f7a-89f3-28597d4bfda6/(ENG)%ED%94%BD%EC%85%80_%EC%95%84%ED%8A%B8%EC%9D%98_%EC%B5%9C%EC%86%8C_%EB%8B%A8%EC%9C%84_%EC%9D%B4%EB%AF%B8%EC%A7%80_%EA%B2%80%EC%B6%9C_%EB%B0%8F_%EC%9D%B4%EB%A5%BC_%ED%86%B5%ED%95%9C_%EB%AC%B4%EC%86%90%EC%8B%A4_%ED%99%95%EB%8C%80_%EC%B6%95%EC%86%8C_%EA%B5%AC%ED%98%84.pdf?table=block&id=19c85821-f0f6-80cf-91b2-c2fea630e389&spaceId=da14c526-1912-42bc-96f1-4c567b4b952e&expirationTimestamp=1739750400000&signature=9Tn3r14-W0SfYCNwz_P8ugm8SLz2khrTUWXfmyEVTY0&downloadName=%28ENG%29%ED%94%BD%EC%85%80+%EC%95%84%ED%8A%B8%EC%9D%98+%EC%B5%9C%EC%86%8C+%EB%8B%A8%EC%9C%84+%EC%9D%B4%EB%AF%B8%EC%A7%80+%EA%B2%80%EC%B6%9C+%EB%B0%8F+%EC%9D%B4%EB%A5%BC+%ED%86%B5%ED%95%9C+%EB%AC%B4%EC%86%90%EC%8B%A4+%ED%99%95%EB%8C%80+%EC%B6%95%EC%86%8C+%EA%B5%AC%ED%98%84.pdf';
        link.download = '(ENG)픽셀 아트의 최소 단위 이미지 검출 및 이를 통한 무손실 확대 축소 구현.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Wrapper>
            <Logo to="/">PIXELZOOM</Logo>
            <Links>
                <NavLink to="/">ABOUT</NavLink>
                <NavLink to="/" onClick={handleDownload}>
                    ARTICLES
                </NavLink>
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

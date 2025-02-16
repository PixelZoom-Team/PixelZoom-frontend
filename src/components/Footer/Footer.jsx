import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
    return (
        <FooterWrapper>
            <FooterContainer>
                <LeftSection>
                    <Logo to="/">PIXELZOOM</Logo>
                    <LinkRow>
                        <StyledLink to="/privacy">개인정보처리방침</StyledLink>
                        <StyledLink to="/terms">이용약관</StyledLink>
                    </LinkRow>
                    <Copyright>ⓒ 2025. PIXELZOOM All rights reserved.</Copyright>
                </LeftSection>
                <RightSection>
                    <Column>
                        <StyledLink to="/">Main</StyledLink>
                    </Column>
                    <Column>
                        <StyledLink to="/about">ABOUT</StyledLink>
                    </Column>
                    <Column>
                        <StyledLink to="/articles">ARTICLES</StyledLink>
                    </Column>
                </RightSection>
            </FooterContainer>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 40px 20px;
    border-top: 2px solid #444;
    background: #1e1e2e;
    color: white;
    box-sizing: border-box;
`;

const FooterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    flex-wrap: wrap;
    gap: 20px;
`;

const LeftSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
`;

const RightSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 600px;
    gap: 20px;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
    cursor: pointer;
`;

const LinkRow = styled.div`
    display: flex;
    gap: 15px;
    font-size: 14px;
`;

const Copyright = styled.div`
    font-size: 12px;
    color: #bbb;
    text-align: left;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-size: 14px;
    &:hover {
        color: #a338f6;
    }
`;

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
    gap: 50px;

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

const Main = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);

    const handleProcessImage = () => {
        if (!imageSrc) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = 16;
            canvas.height = 15;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, 16, 15);
            setProcessedImage(canvas.toDataURL('image/png'));
        };
    };
    const handleDownload = () => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.href = processedImage;
        link.download = 'processed_image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container>
            <UploadBox onClick={() => document.getElementById('fileInput').click()}>
                <Input
                    type="file"
                    id="fileInput"
                    accept="image/png, image/gif"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setImageSrc(reader.result);
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                <UploadText>Click to Upload or Drag and Drop</UploadText>
            </UploadBox>
            {imageSrc && (
                <>
                    <ImagePreview src={imageSrc} alt="Uploaded" />
                    <DownloadButton onClick={handleProcessImage}>Process Image</DownloadButton>
                </>
            )}
            {processedImage && (
                <>
                    <ImagePreview src={processedImage} alt="Processed" />
                    <DownloadButton onClick={handleDownload}>Download Processed Image</DownloadButton>
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1e1e2e;
    color: white;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    padding: 20px;
`;

const UploadBox = styled.div`
    width: 50%;
    border: 2px dashed #888;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    transition: border-color 0.3s;

    &:hover {
        border-color: #fff;
    }
`;

const UploadText = styled.p`
    font-size: 1.2rem;
    color: #bbb;
`;

const Input = styled.input`
    display: none;
`;

const ImagePreview = styled.img`
    margin-top: 20px;
    max-width: 80%;
    height: auto;
    border-radius: 10px;
    image-rendering: pixelated;
`;

const DownloadButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #a338f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #8a2be2;
    }
`;

export default Main;

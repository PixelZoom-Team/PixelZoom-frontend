import React, { useState } from 'react';
import styled from 'styled-components';

const Main = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 300, height: 300 });
    const [scale, setScale] = useState(1);

    const handleDownload = () => {
        if (!imageSrc) return;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            canvas.width = imageSize.width * scale;
            canvas.height = imageSize.height * scale;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'scaled_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    const handleUploadNewImage = () => {
        setImageSrc(null);
        setProcessedImage(null);
        setImageSize({ width: 300, height: 300 });
        setScale(1);
    };

    return (
        <Container>
            <UploadBox
                onClick={() => document.getElementById('fileInput').click()}
                imageSrc={imageSrc}
                imageSize={imageSize}
                hasImage={!!imageSrc}
                scale={scale}
            >
                <Input
                    type="file"
                    id="fileInput"
                    accept="image/png, image/gif"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const img = new Image();
                                img.src = event.target.result;
                                img.onload = () => {
                                    setImageSize({ width: img.width, height: img.height });
                                    setImageSrc(event.target.result);
                                };
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                {!imageSrc && <UploadText>Click to Upload or Drag and Drop</UploadText>}
            </UploadBox>
            {imageSrc && (
                <>
                    <ScaleSlider>
                        <label>Scale: {scale}x</label>
                        <input
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={scale}
                            onChange={(e) => setScale(Number(e.target.value))}
                        />
                    </ScaleSlider>
                    <DownloadButton onClick={handleUploadNewImage}>Upload New Image</DownloadButton>
                    <DownloadButton onClick={handleDownload}>Download Image</DownloadButton>
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
    width: ${({ imageSize, scale }) => Math.min(imageSize.width * scale, 600)}px;
    height: ${({ imageSize, scale }) => Math.min(imageSize.height * scale, 600)}px;
    border: ${({ hasImage }) => (hasImage ? 'none' : '2px dashed #888')};
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: border-color 0.3s;
    background-size: cover;
    background-position: center;
    background-image: ${({ imageSrc }) => (imageSrc ? `url(${imageSrc})` : 'none')};

    &:hover {
        border-color: ${({ hasImage }) => (hasImage ? 'none' : '#fff')};
    }
`;

const ScaleSlider = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    color: white;

    input {
        width: 200px;
        margin-top: 10px;
    }
`;

const UploadText = styled.p`
    font-size: 1.2rem;
    color: #bbb;
`;

const Input = styled.input`
    display: none;
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

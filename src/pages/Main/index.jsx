import React, { useState } from 'react';
import styled from 'styled-components';

const Main = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imageSize, setImageSize] = useState({ width: 300, height: 300 });
    const [scale, setScale] = useState(1);
    const [serverResponse, setServerResponse] = useState(null);
    const [minChunkSize, setMinChunkSize] = useState(1);
    const [isFailed, setIsFailed] = useState(false);

    const handleUploadNewImage = () => {
        setImageSrc(null);
        setImageSize({ width: 300, height: 300 });
        setScale(1);
        setServerResponse(null);
        setMinChunkSize(1);
        setIsFailed(false);
    };

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://sadang.org:8000/api/analyze-image', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('Server Response:', result);
            setServerResponse(result);

            if (result.status?.type === 'failed') {
                setIsFailed(true);
                setMinChunkSize(1);
            } else if (result.data?.minchunksize) {
                setMinChunkSize(Number(result.data.minchunksize.width));
                setIsFailed(false);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleDownloadImage = () => {
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
            link.download = 'processed_image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    return (
        <Container>
            <UploadBox
                onClick={() => document.getElementById('fileInput').click()}
                imageSrc={imageSrc}
                hasImage={!!imageSrc}
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
                                    handleImageUpload(file);
                                };
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                {!imageSrc && <UploadText>Click to Upload or Drag and Drop</UploadText>}
            </UploadBox>

            {serverResponse && (
                <MinChunkInfo>
                    {isFailed ? <p>⚠️ Minchunk 탐지 실패</p> : <p>✅ Minchunk: {minChunkSize}</p>}
                </MinChunkInfo>
            )}

            {imageSrc && (
                <>
                    <ScaleSlider>
                        <label>Scale: {scale.toFixed(2)}x</label>
                        <input
                            type="range"
                            min={isFailed ? 1 : 1 / minChunkSize}
                            max={3}
                            step={isFailed ? 1 : 1 / minChunkSize}
                            value={scale}
                            onChange={(e) => setScale(Number(e.target.value))}
                        />
                        <ResolutionText>
                            Target Resolution: {Math.round(imageSize.width * scale)} x{' '}
                            {Math.round(imageSize.height * scale)}
                        </ResolutionText>
                    </ScaleSlider>
                    <PreviewWrapper>
                        <PreviewContainer>
                            <PreviewImage src={imageSrc} alt="Preview" scale={scale} />
                        </PreviewContainer>
                    </PreviewWrapper>
                    <ButtonGroup>
                        <DownloadButton onClick={handleUploadNewImage}>Upload New Image</DownloadButton>
                        <DownloadButton onClick={handleDownloadImage}>Download Processed Image</DownloadButton>
                    </ButtonGroup>
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
    width: 300px;
    height: 300px;
    border: ${({ hasImage }) => (hasImage ? 'none' : '2px dashed #888')};
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: border-color 0.3s;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({ imageSrc }) => (imageSrc ? `url(${imageSrc})` : 'none')};

    &:hover {
        border-color: ${({ hasImage }) => (hasImage ? 'none' : '#fff')};
    }
`;

const MinChunkInfo = styled.div`
    margin-top: 10px;
    padding: 10px;
    background-color: ${({ isFailed }) => (isFailed ? '#ff4d4d' : '#444')};
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
`;

const ScaleSlider = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    color: white;

    input {
        width: 250px;
        margin-top: 10px;
    }
`;

const ResolutionText = styled.p`
    margin-top: 10px;
    font-size: 1rem;
    color: #bbb;
`;

const PreviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 320px;
    height: 320px;
    background-color: #444;
    border-radius: 10px;
    margin-top: 20px;
    overflow: hidden;
`;

const PreviewContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    transform: scale(${({ scale }) => scale});
    transition: transform 0.3s ease-in-out;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

const DownloadButton = styled.button`
    padding: 14px 20px;
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s, transform 0.2s;
    font-weight: bold;

    &:hover {
        background: linear-gradient(135deg, #2575fc, #6a11cb);
        transform: scale(1.07);
    }
`;

const UploadText = styled.p`
    font-size: 1.2rem;
    color: #bbb;
`;

const Input = styled.input`
    display: none;
`;

export default Main;

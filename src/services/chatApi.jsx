const BASE_URL = 'https://02ad-34-32-196-169.ngrok-free.app';

export const fetchChatResponse = async (question, filters = {}) => {
    const response = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, filters }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export const fetchInfluencerProfile = async (id) => {
    const response = await fetch(`${BASE_URL}/influencer/report/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

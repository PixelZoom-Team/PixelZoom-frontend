import React, { useState } from 'react';

const FetchData = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const fetchData = () => {
        setLoading(true);
        fetch('http://sadang.org:8000/api/analyze-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Hello, server!' }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response:', data);
                setResponse(data);
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Send POST Request</h2>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Send Request'}
            </button>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FetchData;

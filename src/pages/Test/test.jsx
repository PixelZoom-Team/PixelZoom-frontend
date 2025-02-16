import React, { useState } from 'react';

const FetchData = () => {
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch('http://sadang.org:8000/')
            .then(() => console.log('GET request sent to http://sadang.org:8000/'))
            .catch((error) => console.error('Error:', error))
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Send GET Request</h2>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Send Request'}
            </button>
        </div>
    );
};

export default FetchData;

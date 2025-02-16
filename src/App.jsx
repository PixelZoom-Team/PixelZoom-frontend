import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/index';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';
import Footer from './components/Footer/Footer';
import Test from './pages/Test/test';
function App() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            {loading && <Spinner />}
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="test" element={<Test />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

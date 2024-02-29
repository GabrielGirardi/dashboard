import React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import DetailsPage from './components/layout/DetailsPage';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details" element={<DetailsPage />} />
                </Routes>
            </Router>

            {/* <Button variant="contained" color="primary" href='/details'>
                Detalhes
            </Button> */}
        </>
    )
}

export default App;

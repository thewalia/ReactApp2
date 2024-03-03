import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();

    const deleteAccount = async () => {
        const userType = localStorage.getItem('userType');
        const id = localStorage.getItem('userId');

        const response = await fetch(`https://localhost:7211/api/Authentication/DeleteUser/${userType}/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (response.ok) {
            console.log('Account deletion successful');
            localStorage.removeItem('userId');
            localStorage.removeItem('userType');
            navigate('/login');
        } else {
            console.log('Account deletion failed');
        }
    };

    return (
        <div className="dashboard">
            <div className="section">
                <h2>Section 1</h2>
                <p>This is the content of section 1.</p>
            </div>
            <div className="section">
                <h2>Section 2</h2>
                <p>This is the content of section 2.</p>
            </div>
            <div className="section">
                <h2>Section 3</h2>
                <p>This is the content of section 3.</p>
            </div>
            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdvisorDashboard = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [plan, setPlan] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(`https://localhost:7211/api/Advisor/Customers`, {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data)
            setCustomers(data);
        };

        fetchCustomers();
    }, []);

    const updateAdvisorPlan = async (customerId) => {
        const advisorPlan = {
            PortfolioID: 0,
            AdvisorResponse: plan,
            Approval: 0
        };

        const response = await fetch(`https://localhost:7211/api/Advisor/UpdatePlan/${customerId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(advisorPlan)
        });

        if (response.ok) {
            console.log('Plan update successful');
        } else {
            console.log('Plan update failed');
        }
    };

    const createInvestment = () => {
        navigate('/advisordashboard/investment');
    };

    const navigateToSellInvestment = () => {
        navigate('/advisordashboard/sellinvestment');
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
            <h1 style={{ marginBottom: '20px' }}>Advisor Dashboard</h1>
            {customers.map((customer, index) => (
                <div key={index} style={{ marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                      
                        <p>Portfolio Name: {customer.portfolioName}</p>
                        <p>Risk Type: {customer.riskType}</p>
                        <p>Current Value: {customer.currentValue}</p>
                        
                    </div>
                    <div style={{ paddingTop: '10px' }}>
                        <textarea value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="Enter plan" style={{ width: '100%', height: '80px', marginBottom: '10px' }} />
                        <button onClick={() => updateAdvisorPlan(customer.customerID)} style={{ width: '100%' }}>Update Plan</button>
                    </div>
                </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button onClick={createInvestment}>Create Investment</button>
                <button onClick={navigateToSellInvestment}>Sell Investment</button>
            </div>
        </div>
    );

};

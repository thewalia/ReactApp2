import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import Investment from './Investment';
import SellInvestment from './SellInvestment';

export const AdvisorDashboard = () => {
    //const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [plan, setPlan] = useState('');
    const [activeComponent, setActiveComponent] = useState('customers');

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(`https://localhost:7211/api/Advisor/Customers`, {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    const updateAdvisorPlan = async (customerId) => {
        const advisorPlan = {
            PortfolioID: 0,
            AdvisorResponse: plan,
            Approval: 0,
        };
        const response = await fetch(`https://localhost:7211/api/Advisor/UpdatePlan/${customerId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(advisorPlan),
        });
        if (response.ok) {
            console.log('Plan update successful');
        } else {
            console.log('Plan update failed');
        }
    };

    //const createInvestment = () => {
    //    navigate('/advisordashboard/investment');
    //};

    //const navigateToSellInvestment = () => {
    //    navigate('/advisordashboard/sellinvestment');
    //};

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'customers':
                return (
                    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h1 style={{ marginBottom: '20px', color: '#333' }}>Advisor Dashboard</h1>
                        {customers.map((customer, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: '40px',
                                    backgroundColor: '#fff',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    maxWidth: '600px',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                                    <h3 style={{ color: '#333', marginBottom: '10px' }}>Portfolio Details</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <p>
                                            <strong>Portfolio Name:</strong> {customer.portfolioName}
                                        </p>
                                        <p>
                                            <strong>Risk Type:</strong> {customer.riskType}
                                        </p>
                                        <p>
                                            <strong>Current Value:</strong> {customer.currentValue}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h3 style={{ color: '#333', marginBottom: '10px' }}>Advisor Plan</h3>
                                    <textarea
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                        placeholder="Enter plan"
                                        style={{
                                            width: '100%',
                                            height: '100px',
                                            marginBottom: '10px',
                                            padding: '10px',
                                            fontSize: '16px',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                    <button
                                        onClick={() => updateAdvisorPlan(customer.customerID)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#007bff',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                                    >
                                        Update Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'createInvestment':
                return <Investment />;
            case 'sellInvestment':
                return <SellInvestment />
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '20%', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                <h2 style={{ marginBottom: '20px' }}>Menu</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'customers' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('customers')}
                    >
                        Customers
                    </li>
                    <li
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'createInvestment' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('createInvestment')}
                    >
                        Create Investment
                    </li>
                    <li
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'sellInvestment' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('sellInvestment')}
                    >
                        Sell Investment
                    </li>
                </ul>
            </div>
            {renderActiveComponent()}
        </div>
    );
};

export default AdvisorDashboard;
import React, { useEffect, useState } from 'react';
import ClientInvestment from './ClientInvestment';
import AdvisorPlanCard from './AdvisorPlanCard';

export const ClientDashboard = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [advisorPlan, setAdvisorPlan] = useState([]);
    //const [approval, setApproval] = useState(null);
    const [activeComponent, setActiveComponent] = useState('portfolio');
    const [clientInfo, setClientInfo] = useState(null);


    useEffect(() => {
        const fetchPortfolio = async () => {
            const response = await fetch('https://localhost:7211/api/Client/Customers', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setPortfolio(data);
            } else {
                console.error('Failed to fetch portfolio data');
            }
        };

        // New fetch function for client info
        const fetchClientInfo = async () => {
            const response = await fetch('https://localhost:7211/api/Client/ClientInfo', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setClientInfo(data);
            } else {
                console.error('Failed to fetch client info');
            }
        };

        const fetchAdvisorPlan = async () => {
            const response = await fetch('https://localhost:7211/api/Client/AdvisorPlan', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setAdvisorPlan(data);
            } else {
                console.error('Failed to fetch advisor plan');
            }
        };

        fetchPortfolio();
        fetchClientInfo();
        fetchAdvisorPlan();
    }, []);

    const handleApprovalChange = async (portfolioID, newApproval) => {
        const response = await fetch(`https://localhost:7211/api/Client/AdvisorPlanApproval`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newApproval),
            credentials: 'include'
        });
        if (response.ok) {
            console.log('Plan approval updated successfully');
            // Optionally, you can refetch the advisor plans or update the local state
        } else {
            console.error('Failed to update plan approval');
        }
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'portfolio':
                return (
                    <div className="section" style={{ margin: '20px 0' }}>
                        <h2 style={{ color: '#333', fontSize: '24px' }}>Portfolio</h2>
                        {clientInfo && (
                            <div style={{ backgroundColor: '#f5f5f5', padding: '10px', margin: '10px 0' }}>
                                <h3 style={{ color: '#555', fontSize: '20px' }}>Name: {clientInfo.firstName} {clientInfo.lastName}</h3>
                                <p style={{ color: '#777', fontSize: '16px' }}>Email: {clientInfo.email}</p>
                            </div>
                        )}
                        {portfolio.map((item, index) => (
                            <div key={index} style={{ backgroundColor: '#f5f5f5', padding: '10px', margin: '10px 0' }}>
                                <h3 style={{ color: '#555', fontSize: '20px' }}>Portfolio Name: {item.portfolioName}</h3>
                                <p style={{ color: '#777', fontSize: '16px' }}>Risk Type: {item.riskType}</p>
                                <p style={{ color: '#777', fontSize: '16px' }}>Current Value: {item.currentValue}</p>
                                <p style={{ color: '#777', fontSize: '16px' }}>Total Invested Value: {item.totalInvestedValue}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'advisorPlan':
                return (
                    <div className="section" style={{ margin: '20px 0' }}>
                        <h2 style={{ color: '#333', fontSize: '24px' }}>Advisor Plans</h2>
                        {advisorPlan.map((plan, index) => (
                            <AdvisorPlanCard key={index} plan={plan} onApprovalChange={handleApprovalChange} />
                        ))}
                    </div>
                );
            case 'investments': // New case for investments
                return <ClientInvestment />;
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
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'portfolio' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('portfolio')}
                    >
                        Portfolio
                    </li>
                    <li
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'advisorPlan' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('advisorPlan')}
                    >
                        Advisor Plan
                    </li>
                    <li
                        style={{ marginBottom: '10px', cursor: 'pointer', color: activeComponent === 'investments' ? '#fff' : '#ccc' }}
                        onClick={() => setActiveComponent('investments')} // New menu item for investments
                    >
                        Investments
                    </li>
                </ul>
            </div>
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>{renderActiveComponent()}</div>
        </div>
    );
};
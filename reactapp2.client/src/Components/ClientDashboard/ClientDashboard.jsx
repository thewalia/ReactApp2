import React, { useEffect, useState } from 'react';

export const ClientDashboard = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [advisorPlan, setAdvisorPlan] = useState(null);
    const [approval, setApproval] = useState(null);

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
        fetchAdvisorPlan();
    }, []);

    const handleApproval = async () => {
        const response = await fetch('https://localhost:7211/api/Client/AdvisorPlanApproval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(approval),
            credentials: 'include'
        });

        if (response.ok) {
            console.log('Plan approval updated successfully');
        } else {
            console.error('Failed to update plan approval');
        }
    };

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            {/* ... other sections ... */}
            <div className="section" style={{ margin: '20px 0' }}>
                <h2 style={{ color: '#333', fontSize: '24px' }}>Portfolio</h2>
                {portfolio.map((item, index) => (
                    <div key={index} style={{ backgroundColor: '#f5f5f5', padding: '10px', margin: '10px 0' }}>
                        <h3 style={{ color: '#555', fontSize: '20px' }}>{item.portfolioName}</h3>
                        <p style={{ color: '#777', fontSize: '16px' }}>Risk Type: {item.riskType}</p>
                        <p style={{ color: '#777', fontSize: '16px' }}>Current Value: {item.currentValue}</p>
                        <p style={{ color: '#777', fontSize: '16px' }}>Total Invested Value: {item.totalInvestedValue}</p>
                    </div>
                ))}
            </div>
            {advisorPlan && (
                <div className="section" style={{ margin: '20px 0' }}>
                    <h2 style={{ color: '#333', fontSize: '24px' }}>Advisor Plan</h2>
                    <p style={{ color: '#777', fontSize: '16px' }}>Portfolio ID: {advisorPlan.portfolioID}</p>
                    <p style={{ color: '#777', fontSize: '16px' }}>Advisor Response: {advisorPlan.advisorResponse}</p>
                    <p style={{ color: '#777', fontSize: '16px' }}>Approval: {advisorPlan.approval}</p>
                    <input type="number" min="0" max="1" value={approval} onChange={e => setApproval(e.target.value)} />
                    <button onClick={handleApproval} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update Approval</button>
                </div>
            )}
        </div>
    );
};

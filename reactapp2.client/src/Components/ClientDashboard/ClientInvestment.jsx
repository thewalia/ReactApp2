import React, { useEffect, useState } from 'react';

function ClientInvestment() {
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        const fetchInvestments = async () => {
            const response = await fetch('https://localhost:7211/api/Client/Investments', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setInvestments(data);
            } else {
                console.error('Failed to fetch investments');
            }
        };

        fetchInvestments();
    }, []);

    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', flex: 1, margin: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Investments</h2>
            <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', fontSize: '16px', lineHeight: '1.5' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        
                        <th style={{ padding: '10px', textAlign: 'left' }}>Purchase Price</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>AssetType</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>CurrentPrice</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {investments.map((investmentinfo) => (
                        <tr key={investmentinfo.investment.investmentId} style={{ borderBottom: '1px solid #ccc', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#f9f9f9')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}>
                            <td style={{ padding: '10px' }}>{investmentinfo.investment.purchasePrice}</td>
                            <td style={{ padding: '10px' }}>{investmentinfo.investment.quantity}</td>
                            <td style={{ padding: '10px' }}>{investmentinfo.market.assetType}</td>
                            <td style={{ padding: '10px' }}>{investmentinfo.market.name}</td>
                            <td style={{ padding: '10px' }}>{investmentinfo.market.currentPrice}</td>
                            <td style={{ padding: '10px' }}>{investmentinfo.market.symbol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientInvestment;

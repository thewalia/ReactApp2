import React, { useEffect, useState } from 'react';

function SellInvestment() {
    const [investmentDetails, setInvestmentDetails] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchInvestmentDetails();
    }, []);

    const fetchInvestmentDetails = async () => {
        try {
            const response = await fetch('https://localhost:7211/api/Advisor/ClientInvestments', {
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setInvestmentDetails(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sellSelectedAssets = async () => {
        try {
            const response = await fetch('https://localhost:7211/api/Advisor/SellInvestments', {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedAssets),
            });
            const data = await response.json();
            console.log(data);
            fetchInvestmentDetails();
            setSuccessMessage('Investments sold successfully!');
            setSelectedAssets([]);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCheckboxChange = (e, assetId) => {
        if (e.target.checked) {
            setSelectedAssets([...selectedAssets, assetId]);
        } else {
            setSelectedAssets(selectedAssets.filter(id => id !== assetId));
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', flex: 1, margin: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {successMessage && <p style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>{successMessage}</p>}
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Sell Investments</h2>
            <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', fontSize: '16px', lineHeight: '1.5' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Select</th>
                        {/*<th style={{ padding: '10px', textAlign: 'left' }}>InvestmentId</th>*/}
                        {/*<th style={{ padding: '10px', textAlign: 'left' }}>PortfolioId</th>*/}
                        {/*<th style={{ padding: '10px', textAlign: 'left' }}>AssetId</th>*/}
                        <th style={{ padding: '10px', textAlign: 'left' }}>PurchasePrice</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
                        {/*<th style={{ padding: '10px', textAlign: 'left' }}>Market AssetId</th>*/}
                        <th style={{ padding: '10px', textAlign: 'left' }}>AssetType</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>CurrentPrice</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {investmentDetails.map((detail, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ccc', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#f9f9f9')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}>
                            <td style={{ padding: '10px'}}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, detail.investment.assetId)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid #ccc',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    checked={selectedAssets.includes(detail.investment.assetId)}
                                />
                            </td>
                            {/*<td style={{ padding: '10px' }}>{detail.investment.investmentId}</td>*/}
                            {/*<td style={{ padding: '10px' }}>{detail.investment.portfolioId}</td>*/}
                            {/*<td style={{ padding: '10px' }}>{detail.investment.assetId}</td>*/}
                            <td style={{ padding: '10px' }}>{detail.investment.purchasePrice}</td>
                            <td style={{ padding: '10px' }}>{detail.investment.quantity}</td>
                            {/*<td style={{ padding: '10px' }}>{detail.market.assetId}</td>*/}
                            <td style={{ padding: '10px' }}>{detail.market.assetType}</td>
                            <td style={{ padding: '10px' }}>{detail.market.name}</td>
                            <td style={{ padding: '10px' }}>{detail.market.currentPrice}</td>
                            <td style={{ padding: '10px' }}>{detail.market.symbol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={sellSelectedAssets}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                        <path d="M20 12H4" />
                    </svg>
                    Sell Selected Assets
                </button>
            </div>
        </div>
    );
}

export default SellInvestment;
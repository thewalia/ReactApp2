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
            } // Include cookies and other credentials
           );
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
            // Refresh the investment details after selling assets
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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Checkbox</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>InvestmentId</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>PortfolioId</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>AssetId</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>PurchasePrice</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Quantity</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Market AssetId</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Market AssetType</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Market Name</th>
                        <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Market CurrentPrice</th>
                    </tr>
                </thead>
                <tbody>
                    {investmentDetails.map((detail, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleCheckboxChange(e, detail.investment.assetId)}
                                />
                            </td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.investment.investmentId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.investment.portfolioId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.investment.assetId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.investment.purchasePrice}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.investment.quantity}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.market.assetId}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.market.assetType}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.market.name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{detail.market.currentPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={sellSelectedAssets}>Sell Selected Assets</button>
        </div>
    );
}

export default SellInvestment;
import React, { useState, useEffect } from 'react';

function Investment() {
    const [assets, setAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [investmentStatus, setInvestmentStatus] = useState('');

    useEffect(() => {
        const fetchAssets = async () => {
            const response = await fetch('https://localhost:7211/api/Advisor/AvailableAssets');
            const data = await response.json();
            setAssets(data);
        };

        fetchAssets();
    }, []);

    const handleAssetSelect = (assetId) => {
        setSelectedAssets(prevSelectedAssets => {
            if (prevSelectedAssets.includes(assetId)) {
                return prevSelectedAssets.filter(id => id !== assetId);
            } else {
                return [...prevSelectedAssets, assetId];
            }
        });
    };

    const handleInvestmentsSubmit = async () => {
        const response = await fetch('https://localhost:7211/api/Advisor/AddInvestments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedAssets),
            credentials: 'include'

        });

        if (response.ok) {
            setInvestmentStatus('Investments added successfully');
        } else {
            setInvestmentStatus('Failed to add investments');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
            <h1 style={{ marginBottom: '20px' }}>Available Assets</h1>
            {investmentStatus && <p>{investmentStatus}</p>}
            <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #ccc' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Select</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Type</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Price</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                            <td style={{ padding: '10px' }}>
                                <input type="checkbox" onChange={() => handleAssetSelect(asset.assetId)} />
                            </td>
                            <td style={{ padding: '10px' }}>{asset.assetId}</td>
                            <td style={{ padding: '10px' }}>{asset.assetType}</td>
                            <td style={{ padding: '10px' }}>{asset.name}</td>
                            <td style={{ padding: '10px' }}>{asset.currentPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleInvestmentsSubmit}>Add Investments</button>
        </div>
    );
}

export default Investment;

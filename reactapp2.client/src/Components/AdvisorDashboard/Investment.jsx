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
        setSelectedAssets((prevSelectedAssets) => {
            if (prevSelectedAssets.includes(assetId)) {
                return prevSelectedAssets.filter((id) => id !== assetId);
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
            credentials: 'include',
        });

        if (response.ok) {
            setInvestmentStatus('Investments added successfully');
        } else {
            setInvestmentStatus('Failed to add investments');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', flex: 1, margin: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ marginBottom: '20px', color: '#333', textAlign: 'center' }}>Available Assets</h1>
            {investmentStatus && <p style={{ color: investmentStatus.includes('success') ? 'green' : 'red', textAlign: 'center' }}>{investmentStatus}</p>}
            <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', fontSize: '16px', lineHeight: '1.5' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Select</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset ID</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Type</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Name</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Asset Price</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #ccc', transition: 'background-color 0.3s ease' }} onMouseEnter={(e) => (e.target.style.backgroundColor = '#f9f9f9')} onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffffff')}>
                            <td style={{ padding: '10px' }}>
                                <input
                                    type="checkbox"
                                    onChange={() => handleAssetSelect(asset.assetId)}
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        border: '2px solid #ccc',
                                        borderRadius: '4px',
                                        outline: 'none',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    checked={selectedAssets.includes(asset.assetId)}
                                />
                            </td>
                            <td style={{ padding: '10px' }}>{asset.assetId}</td>
                            <td style={{ padding: '10px' }}>{asset.assetType}</td>
                            <td style={{ padding: '10px' }}>{asset.name}</td>
                            <td style={{ padding: '10px' }}>{asset.currentPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleInvestmentsSubmit}
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
                        <path d="M12 20v-8m0 0V8m0 4h8M4 12H20" />
                    </svg>
                    Add Investments
                </button>
            </div>
        </div>
    );
}

export default Investment;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function ClientForm() {
    const [financialGoals, setFinancialGoals] = useState('');
    const [riskTolerance, setRiskTolerance] = useState('');
    const [investmentExperience, setInvestmentExperience] = useState('');
    const [incomeAndLiquidityNeeds, setIncomeAndLiquidityNeeds] = useState('');
    const [riskCapacity, setRiskCapacity] = useState('');
    const [riskResult, setRiskResult] = useState('');
    const navigate = useNavigate();


    const calculateRiskTolerance = () => {
        const totalPoints =
            parseInt(financialGoals) +
            parseInt(riskTolerance) +
            parseInt(investmentExperience) +
            parseInt(incomeAndLiquidityNeeds) +
            parseInt(riskCapacity);

        if (totalPoints >= 71) {
            return 'High';
        } else if (totalPoints >= 31) {
            return 'Medium';
        } else {
            return 'Low';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const calculatedRiskResult = calculateRiskTolerance();
        setRiskResult(calculatedRiskResult);

        try {
            const response = await fetch(`https://localhost:7211/api/Client/RiskType`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ riskResult: calculatedRiskResult }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Response:', data);
            navigate('/clientdashboard');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' }}>
        <div style={{ margin: '0 auto', width: '50%', padding: '40px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
            <h1 style={{ textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '32px', color: '#333', marginBottom: '30px' }}>Client Form</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#555', marginBottom: '8px' }}>
                    Financial Goals and Time Horizon:
                    <select
                        value={financialGoals}
                        onChange={(e) => setFinancialGoals(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Roboto, sans-serif' }}
                    >
                        <option value="">Select Option</option>
                        <option value="8">Capital growth</option>
                        <option value="6">Balanced growth and income</option>
                        <option value="6">Income generation and wealth preservation</option>
                    </select>
                </label>
                <br />
                <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#555', marginBottom: '8px' }}>
                    Risk Tolerance:
                    <select
                        value={riskTolerance}
                        onChange={(e) => setRiskTolerance(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Roboto, sans-serif' }}
                    >
                        <option value="">Select Option</option>
                        <option value="10">Very comfortable (High risk tolerance)</option>
                        <option value="7">Somewhat comfortable (Medium risk tolerance)</option>
                        <option value="5">Not comfortable (Low risk tolerance)</option>
                    </select>
                </label>
                <br />
                <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#555', marginBottom: '8px' }}>
                    Investment Experience and Knowledge:
                    <select
                        value={investmentExperience}
                        onChange={(e) => setInvestmentExperience(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Roboto, sans-serif' }}
                    >
                        <option value="">Select Option</option>
                        <option value="8">Experienced investor</option>
                        <option value="6">Moderate experience</option>
                        <option value="4">Limited experience</option>
                    </select>
                </label>
                <br />
                <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#555', marginBottom: '8px' }}>
                    Income and Liquidity Needs:
                    <select
                        value={incomeAndLiquidityNeeds}
                        onChange={(e) => setIncomeAndLiquidityNeeds(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Roboto, sans-serif' }}
                    >
                        <option value="">Select Option</option>
                        <option value="7">No immediate cash needs</option>
                        <option value="5">Some immediate cash needs</option>
                        <option value="3">Significant immediate cash needs</option>
                    </select>
                </label>
                <br />
                <label style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', color: '#555', marginBottom: '8px' }}>
                    Risk Capacity:
                    <select
                        value={riskCapacity}
                        onChange={(e) => setRiskCapacity(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'Roboto, sans-serif' }}
                    >
                        <option value="">Select Option</option>
                        <option value="7">Strong financial position</option>
                        <option value="5">Moderate financial position</option>
                        <option value="3">Limited financial resources</option>
                    </select>
                </label>
                <br />
                <button
                    type="submit"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        fontFamily: 'Roboto, sans-serif',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                >
                    Calculate Risk Tolerance
                </button>
            </form>
            {riskResult && <p style={{ textAlign: 'center', marginTop: '30px', fontFamily: 'Roboto, sans-serif', fontSize: '20px', color: '#333' }}>Risk Tolerance: {riskResult}</p>}
            </div>
        </div>
    );
}

export default ClientForm;
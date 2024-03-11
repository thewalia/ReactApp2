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
            setRiskResult('High');
        } else if (totalPoints >= 31) {
            setRiskResult('Medium');
        } else {
            setRiskResult('Low');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        calculateRiskTolerance();

        try {
            const response = await fetch(`https://localhost:7211/api/Client/RiskType`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(riskResult),
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
        <div style={{ margin: '0 auto', width: '50%', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Client Form</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label>
                    Financial Goals and Time Horizon:
                    <select value={financialGoals} onChange={(e) => setFinancialGoals(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="8">Capital growth</option>
                        <option value="6">Balanced growth and income</option>
                        <option value="6">Income generation and wealth preservation</option>
                    </select>
                </label>
                <br />
                <label>
                    Risk Tolerance:
                    <select value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="10">Very comfortable (High risk tolerance)</option>
                        <option value="7">Somewhat comfortable (Medium risk tolerance)</option>
                        <option value="5">Not comfortable (Low risk tolerance)</option>
                    </select>
                </label>
                <br />
                <label>
                    Investment Experience and Knowledge:
                    <select value={investmentExperience} onChange={(e) => setInvestmentExperience(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="8">Experienced investor</option>
                        <option value="6">Moderate experience</option>
                        <option value="4">Limited experience</option>
                    </select>
                </label>
                <br />
                <label>
                    Income and Liquidity Needs:
                    <select value={incomeAndLiquidityNeeds} onChange={(e) => setIncomeAndLiquidityNeeds(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="7">No immediate cash needs</option>
                        <option value="5">Some immediate cash needs</option>
                        <option value="3">Significant immediate cash needs</option>
                    </select>
                </label>
                <br />
                <label>
                    Risk Capacity:
                    <select value={riskCapacity} onChange={(e) => setRiskCapacity(e.target.value)}>
                        <option value="">Select Option</option>
                        <option value="7">Strong financial position</option>
                        <option value="5">Moderate financial position</option>
                        <option value="3">Limited financial resources</option>
                    </select>
                </label>
                <br />
                <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Calculate Risk Tolerance</button>
            </form>
            {riskResult && <p style={{ textAlign: 'center', marginTop: '20px' }}>Risk Tolerance: {riskResult}</p>}
        </div>
    );
}

export default ClientForm;
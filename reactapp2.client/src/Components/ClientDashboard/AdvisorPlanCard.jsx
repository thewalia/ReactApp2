import React, { useState } from 'react';

const AdvisorPlanCard = ({ plan ,onApprovalChange } ) => {
    const [approval, setApproval] = useState(plan.approval);

    const handleApprovalChange = async (newApproval) => {
        setApproval(newApproval);
        await onApprovalChange(plan.portfolioID, newApproval);
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: '#555', fontSize: '20px' }}>Portfolio ID: {plan.portfolioID}</h3>
                <p style={{ color: '#777', fontSize: '16px' }}>Approval: {approval}</p>
            </div>
            <p style={{ color: '#777', fontSize: '16px', marginBottom: '10px' }}>Advisor Response: {plan.advisorResponse}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="number"
                    min="0"
                    max="1"
                    value={approval}
                    onChange={e => handleApprovalChange(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px', fontSize: '16px' }}
                />
                <button
                    onClick={() => handleApprovalChange(approval)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    Update Approval
                </button>
            </div>
        </div>
    );
};

export default AdvisorPlanCard;
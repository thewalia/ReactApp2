import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
function AdvisorForm() {

    const [qualifications, setQualifications] = useState('');
    const [experienceYears, setExperienceYears] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7211/api/Advisor/Experience`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    qualifications,
                    experienceYears: parseInt(experienceYears),
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/advisorform/listofclients');

        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '400px',
                padding: '20px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                backgroundColor: 'white'
            }}>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '15px'
                }}>
                    <label htmlFor="qualifications">Qualifications:</label>
                    <input
                        type="text"
                        id="qualifications"
                        value={qualifications}
                        onChange={(e) => setQualifications(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '15px'
                }}>
                    <label htmlFor="experienceYears">Experience Years:</label>
                    <input
                        type="number"
                        id="experienceYears"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <button type="submit" style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                    fontSize: '16px'
                }}>Submit</button>

                <button
                    onClick={() => navigate('/AdvisorDashboard')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s ease',
                        fontSize: '16px',
                        marginTop: '10px'
                    }}
                >
                    Already sent details please go to AdvisorDashboard
                </button>
            </form>
        </div>
    );
}

export default AdvisorForm;

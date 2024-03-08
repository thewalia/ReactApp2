import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ListOfClient() {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://localhost:7211/api/client');
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                console.log(data);
                setClients(data);
            } catch (error) {
                setError(error.message);
            } finally {
                //console.log(clients)
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        console.log(clients); // Log the clients state
    }, [clients]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const assignAdvisorToCustomer = async (customerId) => {
        try {
            const response = await fetch(`https://localhost:7211/api/Advisor/AssignCustomer/${customerId}`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/AdvisorDashboard');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4'
        }}>
           
            <h2 style={{ marginBottom: '20px' }}>Clients List</h2>
            <table style={{
                textAlign: 'left',
                borderCollapse: 'collapse',
                marginBottom: '30px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                backgroundColor: 'white'
            }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>Customer</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>UserID</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>RiskType</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{client.customerID}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{client.userID}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{client.riskType}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                <button onClick={() => assignAdvisorToCustomer(client.customerID)}>Assign Advisor</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default ListOfClient;
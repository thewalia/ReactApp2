import { useState } from 'react';
import './App.css';

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [sessionValue, setSessionValue] = useState("");

    const login = async () => {
        const response = await fetch('https://localhost:7211/api/Advisor/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        if (response.ok) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
        }
    };

    const testSession = async () => {
        const response = await fetch('https://localhost:7211/api/SessionTesting/get-session', {
            credentials: 'include'
        });

        if (response.ok) {
            const value = await response.text();
            setSessionValue(value);
        } else {
            console.log("Session test failed");
        }
    };

    return (
        <div>
            <div>
                <h2>Login</h2>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button onClick={login}>Login</button>
            </div>
            <div>
                <h2>Test Session</h2>
                <button onClick={testSession}>Test Session</button>
                <p>Session value: {sessionValue}</p>
            </div>
        </div>
    );
}

export default App;

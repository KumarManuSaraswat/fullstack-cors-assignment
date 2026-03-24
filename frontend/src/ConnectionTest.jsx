import { useState } from 'react';

export default function ConnectionTest() {
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const testConnection = async () => {
        setStatus('loading');
        try {
            // Notice the relative path here! Vite proxy will forward this to http://localhost:5000/api/status
            const response = await fetch('/api/status');
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setStatus('success');
            setMessage(data.message);
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect to the backend. Is the server running?');
            console.error('Connection error:', error);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
            <h2>Backend Connectivity Test</h2>
            <button onClick={testConnection} disabled={status === 'loading'}>
                {status === 'loading' ? 'Testing...' : 'Test Connection'}
            </button>

            {status === 'success' && <p style={{ color: 'green' }}>✅ {message}</p>}
            {status === 'error' && <p style={{ color: 'red' }}>❌ {message}</p>}
        </div>
    );
}
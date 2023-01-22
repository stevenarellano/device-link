import React from 'react';
import { useRouter } from 'next/router';

const Landing: React.FC = () => {
    const router = useRouter();
    return (
        <div>
            <h1>Welcome to Sold Sensor</h1>
            <p>The ultimate tool for tracking your sales</p>
            <div>
                <button onClick={() => router.push('/dashboard')}>Buyers</button>
                <button onClick={() => router.push('/connect')}>Sellers</button>
            </div>
        </div>
    );
};

export default Landing;
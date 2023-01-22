import React from 'react';
import { useRouter } from 'next/router';

const Connect: React.FC = () => {
    const router = useRouter();

    return (
        <div>
            <h1>Connecting to a Lorawan Network Service</h1>
            <p>To send and receive payments for your data through an LNS, follow these steps:</p>
            <ol>
                <li>Have a device added to your favorite LNS</li>
                <li>Select the option to add an HTTP integration</li>
                <li>Select the POST option</li>
                <li>Enter your endpoint URL</li>
                <li>Add your Solana wallet address to the URL params</li>
                <li>Add the integration</li>
            </ol>
            <p>Popular LNS providers:</p>
            <ul>
                <li><a href="https://console.helium.com/">Helium</a></li>
                <li><a href="https://www.thethingsnetwork.org/">The Things Network</a></li>
                <li><a href="https://loraserver.io/">Loraserver</a></li>
                <li><a href="https://chirpstack.io/">ChirpStack</a></li>
            </ul>
            <button onClick={() => router.push('/landing')}>Back to Landing Page</button>
        </div>
    );
};

export default Connect;

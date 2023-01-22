import React from 'react';
import { useRouter } from 'next/router';
import styles from '/styles/modules/Connect.module.scss';

const Connect: React.FC = () => {
    const router = useRouter();

    return (
        <div className={styles.connectContainer}>
            <h1 className={styles.heading}>Connecting to a Lorawan Network Service</h1>
            <p className={styles.subHeading}>To send and receive payments for your data through an LNS, follow these steps:</p>
            <ol className={styles.stepsList}>
                <li className={styles.step}>Have a device added to your favorite LNS</li>
                <li className={styles.step}>Select the option to add an HTTP integration</li>
                <li className={styles.step}>Select the POST option</li>
                <li className={styles.step}>Enter your endpoint URL</li>
                <li className={styles.step}>Add your Solana wallet address to the URL params</li>
                <li className={styles.step}>Add the integration</li>
            </ol>
            <p className={styles.providers}>Popular LNS providers:</p>
            <ul className={styles.providersList}>
                <li className={styles.provider}><a href="https://console.helium.com/">Helium</a></li>
                <li className={styles.provider}><a href="https://www.thethingsnetwork.org/">The Things Network</a></li>
                <li className={styles.provider}><a href="https://loraserver.io/">Loraserver</a></li>
                <li className={styles.provider}><a href="https://chirpstack.io/">ChirpStack</a></li>
            </ul>
            <button className={styles.backButton} onClick={() => router.push('/landing')}>Back to Landing Page</button>
        </div>
    );
};

export default Connect;

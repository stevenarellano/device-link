import React from 'react';
import { useRouter } from 'next/router';
import styles from '/styles/modules/Landing.module.scss';

const Landing: React.FC = () => {
    const router = useRouter();
    return (
        <div className={styles.landingContainer}>
            <h1 className={styles.heading}>Welcome to Device Link</h1>
            <p className={styles.subHeading}>The data hub of the world</p>
            <div className={styles.buttonContainer}>
                <button className={styles.buyersButton} onClick={() => router.push('/dashboard')}>Buyers</button>
                <button className={styles.sellersButton} onClick={() => router.push('/connect')}>Sellers</button>
            </div>
        </div>
    );
};

export default Landing;

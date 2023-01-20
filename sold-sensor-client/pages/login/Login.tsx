import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "/styles/modules/Login.module.scss";
import { isWalletConnected } from '../../api';


const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handlePhantomLogin = async () => {
        setIsLoading(true);
        try {
            const addr = await isWalletConnected();
            if (addr.length === 0) {
                throw 'No Solana wallet found. Please install Phantom Wallet.';
            }
            // Trigger opening of Phantom Wallet chrome extension
            // and request access for this website
            // Handle successful login and redirect to dashboard
            router.push("/dashboard");
        } catch (error) {
            // Handle error and display error message
            console.log(error);
            setError("'No Solana wallet found. Please install Phantom Wallet.'.");
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to Sold Sensor</h1>
            <p className={styles.subtitle}>
                Please log in with your Phantom Wallet to access your dashboard.
            </p>

            <button
                className={`${styles.phantomButton} ${isLoading ? styles.loading : ""}`}
                onClick={handlePhantomLogin}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Log in with Phantom Wallet"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Login;

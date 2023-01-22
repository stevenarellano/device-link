import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../context';
import styles from '/styles/modules/Purchased.module.scss';

const Purchased = () => {
    const router = useRouter();
    const { accessKey } = router.query;

    const [state, setState] = useState({
        copied: false
    });

    useEffect(() => {
        if (state.copied) {
            setTimeout(() => {
                setState({ copied: false });
            }, 2000);
        }
    }, [state.copied]);

    const copyAccessKey = () => {
        navigator.clipboard.writeText(accessKey as string);
        setState({ copied: true });
    };
    const curlCommand = `curl -X POST -H "Content-Type: application/json" -d '{"accessKey":"${accessKey}"}' ${BASE_URL}/api/data`;
    const copyCurlCommand = () => {

        navigator.clipboard.writeText(curlCommand);
        setState({ copied: true });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Congratulations on your purchase!</h1>
            <p className={styles.keyContainer}>Your access key is: <span className={styles.key}>{accessKey}</span></p>
            <button className={styles.copyBtn} onClick={copyAccessKey}>
                {state.copied ? "Copied" : "Copy Access Key"}
            </button>
            <p>Or use this curl command to access data:</p>
            <code className={styles.curlCommand}>{`curl...${curlCommand.slice(-12)}`}</code>
            <button className={styles.copyBtn} onClick={copyCurlCommand}>
                {state.copied ? "Copied" : "Copy curl command"}
            </button>
            <button className={styles.startOverBtn} onClick={() => router.push('/dashboard')}>
                Start Over
            </button>
        </div>
    );
};

export default Purchased;

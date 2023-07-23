import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../../context';
import styles from '/styles/modules/Purchased.module.scss';
const Purchased = () => {
    const router = useRouter();
    const { accessKey } = router.query;

    const [accessKeyCopied, setAccessKeyCopied] = useState(false);
    const [curlCommandCopied, setCurlCommandCopied] = useState(false);

    useEffect(() => {
        if (accessKeyCopied) {
            setTimeout(() => {
                setAccessKeyCopied(false);
            }, 2000);
        }
    }, [accessKeyCopied]);

    useEffect(() => {
        if (curlCommandCopied) {
            setTimeout(() => {
                setCurlCommandCopied(false);
            }, 2000);
        }
    }, [curlCommandCopied]);

    const copyAccessKey = () => {
        navigator.clipboard.writeText(accessKey as string);
        setAccessKeyCopied(true);
    };
    const curlCommand = `curl -X POST -H "Content-Type: application/json" -d '{"accessKey":"${accessKey}"}' ${BASE_URL}/api/data`;
    const copyCurlCommand = () => {

        navigator.clipboard.writeText(curlCommand);
        setCurlCommandCopied(true);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Congratulations on your purchase!</h1>
            <p className={styles.keyContainer}>Your access key is: <span className={styles.key}>{accessKey}</span>. Pass this through the body in a post request to {BASE_URL}/api/data </p>
            <button className={styles.copyBtn} onClick={copyAccessKey}>
                {accessKeyCopied ? "Copied" : "Copy Access Key"}
            </button>
            <p>Or use this curl command to access data:</p>
            <code className={styles.curlCommand}>{`curl...${curlCommand.slice(-12)}`}</code>
            <button className={styles.copyBtn} onClick={copyCurlCommand}>
                {curlCommandCopied ? "Copied" : "Copy curl command"}
            </button>
            <button className={styles.startOverBtn} onClick={() => router.push('/dashboard')}>
                Buy More
            </button>
        </div>
    );
};


export default Purchased;

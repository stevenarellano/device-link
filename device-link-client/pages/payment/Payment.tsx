import React, { useEffect, useState } from "react";
import styles from "/styles/modules/Payment.module.scss";
import { callPay, fetchQuote, sendPhantomTransaction } from '../../api';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { queryInfoState } from '../../context';

const Payment = () => {
    const router = useRouter();
    const { quoteId } = router.query;
    const [quote, setQuote] = useState<any>();
    const [queryInfo, setQueryInfo] = useRecoilState(queryInfoState);

    useEffect(() => {
        async function loadQuote() {
            if (!router.isReady) return;
            const quote = await pageLoad(quoteId as string);
            setQuote(quote);

            setQueryInfo({ ...queryInfo, count: (quote as any).data_count });
        }
        loadQuote();
    }, [quoteId, router.isReady]);

    async function pageLoad(quoteId: string) {
        console.log(quoteId);
        if (!quoteId) return;
        const quote = await fetchQuote(quoteId as string);
        console.log(quote);
        return quote;
    }

    const handleBuy = () => {
        buyData();
    };

    const buyData = async () => {
        // function to handle buying data
        if (await sendPhantomTransaction(quote.cost, quote.data_count)) {
            const accessKey = await callPay(queryInfo);
            if (accessKey) {
                router.push({ pathname: '/purchased', query: { 'accessKey': accessKey } });
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.dataContainer}>
                {quote ? (
                    <>
                        <div className={styles.data}>Cost in SOL: {quote.cost}</div>
                        <div className={styles.data}>Amount of data to be fetched: {quote.data_count}</div>
                        <div className={styles.btnContainer}>
                            <button className={styles.button} onClick={() => router.push('/dashboard')}>Go Back</button>
                            <button className={styles.button} onClick={handleBuy}>Buy</button>
                        </div>
                    </>
                ) : (
                    <div className={styles.data}>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default Payment;
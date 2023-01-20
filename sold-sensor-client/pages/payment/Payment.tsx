import React, { useEffect, useState } from "react";
import styles from "/styles/modules/Login.module.scss";
import { fetchQuote } from '../../api';
import { useRouter } from 'next/router';


async function pageLoad(quoteId: string) {
    console.log(quoteId);
    if (!quoteId) return;
    const quote = await fetchQuote(quoteId as string);
    console.log(quote);
}

const Payment = () => {
    const router = useRouter();
    const { quoteId } = router.query;

    useEffect(() => {
        if (!router.isReady) return;

        pageLoad(quoteId as string);

    }, [quoteId, router.isReady]);
    return (
        <div className={styles.container}>
            payment page
        </div>
    );
};

export default Payment;

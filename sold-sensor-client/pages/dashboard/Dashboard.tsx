import React, { useState } from 'react';
import styles from '/styles/modules/Dashboard.module.scss';
import { callPay, getQuote } from '../../api';
import { useRouter } from "next/router";
import { useSetRecoilState } from 'recoil';
import { queryInfoState } from '../../context';

interface Props {
    error: string;
}

const Error = ({ error }: Props) => {
    return (
        <div className={styles.error}>
            {error}
        </div>
    );
};

const Dashboard = () => {
    const [countLimit, setCountLimit] = useState(10);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
    const [advancedFilters, setAdvancedFilters] = useState([]) as any;
    const [error, setError] = useState('');
    const router = useRouter();
    const setQueryInfo = useSetRecoilState(queryInfoState);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let hasError = false;
        if (!countLimit) {
            setError('Please enter a count limit.');
            hasError = true;
        }
        if (!startDate) {
            setError('Please enter a start date.');
            hasError = true;
        }
        if (!endDate) {
            setError('Please enter an end date.');
            hasError = true;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);


        const advancedFiltersObject = advancedFilters.reduce(
            (obj: any, item: { parameter: any; value: any; }) => Object.assign(obj, { [item.parameter]: item.value }), {});

        if (!hasError && start <= end) {
            const body = {
                period: [start.toISOString(), end.toISOString()],
                queries: advancedFiltersObject,
                limit: countLimit,
            };
            console.log(body);
            const quoteId = await getQuote(body);
            if (quoteId.length) {
                setQueryInfo({ period: body.period, queries: body.queries, count: body.limit });
                router.push({ pathname: '/payment', query: { 'quoteId': quoteId } });
            }
            else { setError('No quoteId returned from server. Please try again.'); }
        }
    };

    const handleAddFilter = () => {
        setAdvancedFilters([...advancedFilters, { parameter: '', value: '' }]);
    };

    const handleRemoveFilter = (index: number) => {
        const newFilters = [...advancedFilters];
        newFilters.splice(index, 1);
        setAdvancedFilters(newFilters);
    };

    const handleFilterChange = (e: any, index: number) => {
        const newFilters = [...advancedFilters];
        newFilters[index][e.target.name] = e.target.value;
        setAdvancedFilters(newFilters);
    };

    return (
        <div className={styles.soldSensor}>
            <h1 className={styles.title}>Sold Sensor</h1>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <label className={styles.formGroup}>
                    Count Limit:
                    <input
                        type="number"
                        value={countLimit}
                        onChange={(e: any) => setCountLimit(e.target.value)}
                        className={styles.formControl}
                    />
                </label>
                <label className={styles.formGroup}>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e: any) => setStartDate(e.target.value)}
                        className={styles.formControl}
                    />
                </label>
                <label className={styles.formGroup}>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e: any) => setEndDate(e.target.value)}
                        className={styles.formControl}
                    />
                </label>
                {advancedFilters.map((filter: any, index: any) => (
                    <label key={index} className={styles.formGroup}>
                        <input
                            type="text"
                            name="parameter"
                            value={filter.parameter}
                            onChange={(e: any) => handleFilterChange(e, index)}
                            className={styles.formControl}
                        />
                        :&nbsp;
                        <input
                            type="text"
                            name="value"
                            value={filter.value}
                            onChange={(e: any) => handleFilterChange(e, index)}
                            className={styles.formControl}
                        />
                        <button type="button" onClick={() => handleRemoveFilter(index)} className={styles.removeFilterBtn}>Remove</button>
                    </label>
                ))
                }
                <button type="button" onClick={handleAddFilter} className={styles.addFilterBtn}>
                    Add Filter
                </button>
                <br />
                <button type="submit" className={styles.submitBtn}>Submit</button>
                {error && <Error error={error} />}
            </form >
        </div >
    );
};

export default Dashboard;
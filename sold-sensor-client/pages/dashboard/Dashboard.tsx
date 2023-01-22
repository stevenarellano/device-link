import React from 'react';
import styles from '/styles/modules/Dashboard.module.scss';
import { useDashboard } from './useDashboard';

const Error = ({ error }: any) => {
    return (
        <div className={styles.error}>
            {error}
        </div>
    );
};

const Dashboard = () => {
    const { countLimit, setCountLimit, startDate, setStartDate, endDate, setEndDate, advancedFilters, setAdvancedFilters, error, setError, handleSubmit, handleAddFilter, handleRemoveFilter, handleFilterChange, advancedFilterOptions } = useDashboard();

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
                <div className={styles.advancedFiltersContainer}>
                    <h3 className={styles.advancedFiltersTitle}>Advanced Filters</h3>
                    <div className={styles.advancedFilters}>
                        {advancedFilters.map((filter: any, index: any) => (
                            <div key={index} className={styles.advancedFilter}>
                                <select
                                    name="parameter"
                                    value={filter.parameter}
                                    onChange={e => handleFilterChange(e, index)}
                                    className={styles.formControl}
                                >
                                    {advancedFilterOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    name="value"
                                    value={filter.value}
                                    onChange={e => handleFilterChange(e, index)}
                                    className={styles.formControl}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFilter(index)}
                                    className={styles.removeFilter}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddFilter} className={styles.addFilter}>
                            Add Filter
                        </button>
                    </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                    Submit
                </button>
                {error && <Error error={error} />}
            </form>
        </div>
    );
};

export default Dashboard;


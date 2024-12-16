import React from "react";
import styles from "./Filters.module.scss";
import CurrencySelect from "./components/CurrencySelect/CurrencySelect";
import StopsFilter from "./components/StopsFilter/StopsFilter";

interface FiltersProps {
  filters: { nonStop: boolean; oneStop: boolean; twoPlusStops: boolean; currency: string; stops: number[] };
  onFilterChange: (filter: string, checked: boolean) => void;
  onCurrencyChange: (currency: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onCurrencyChange }) => (
  <div className={styles.filtersContainer}>
    <CurrencySelect currency={filters.currency} onCurrencyChange={onCurrencyChange} />
    <StopsFilter stops={filters.stops} onFilterChange={onFilterChange} />
  </div>
);

export default Filters;

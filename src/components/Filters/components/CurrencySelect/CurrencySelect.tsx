import React from "react";
import styles from "./CurrencySelect.module.scss";
import { CURRENCIES } from "../../../../constans/currency";

interface CurrencySelectProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ currency, onCurrencyChange }) => (
  <div className={styles.filtersCurrency}>
    <h2>Валюта</h2>
    <div className={styles.currencySelect}>
      {CURRENCIES.map((cur) => (
        <button
          key={cur}
          className={`${styles.currencyButton} ${currency === cur ? styles.active : ""}`}
          onClick={() => onCurrencyChange(cur)}
        >
          {cur}
        </button>
      ))}
    </div>
  </div>
);

export default CurrencySelect;

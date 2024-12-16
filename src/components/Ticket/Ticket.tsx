import React, { useMemo } from "react";
import styles from "./Ticket.module.scss";
import { Ticket as TicketType } from "../../types/ticket";
import { CURRENCY_RATES } from "../../constans/currency";

interface TicketProps extends TicketType {
  currency: keyof typeof CURRENCY_RATES;
}

const getStopsText = (stops: number) => {
  const forms = ["пересадка", "пересадки", "пересадок"];
  const lastDigit = stops % 10;
  const lastTwoDigits = stops % 100;

  if (stops === 0) return "Без пересадок";

  if (lastDigit === 1 && lastTwoDigits !== 11) return `${stops} ${forms[0]}`;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) return `${stops} ${forms[1]}`;
  return `${stops} ${forms[2]}`;
};

const Ticket: React.FC<TicketProps> = ({
  origin,
  origin_name,
  destination,
  destination_name,
  departure_date,
  departure_time,
  arrival_date,
  arrival_time,
  carrier,
  stops,
  price,
  currency,
}) => {
  const rate = CURRENCY_RATES[currency] || CURRENCY_RATES.RUB;
  const convertedPrice = useMemo(() => price / rate, [price, rate]);
  const roundedPrice = useMemo(() => Math.round(convertedPrice), [convertedPrice]);

  return (
    <div className={styles.ticket}>
      <div className={styles.left}>
        <div className={styles.carrierBox}>{carrier}</div>
        <button className={styles.buyButton}>
          <span className={styles.buttonText}>Купить</span>
          <span className={styles.buttonPrice}>
            {roundedPrice} {currency}
          </span>
        </button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.right}>
        <div className={styles.details}>
          <div className={`${styles.column} ${styles.leftColumn}`}>
            <span className={styles.time}>{departure_time}</span>
            <p className={styles.location}>
              {origin}, {origin_name}
            </p>
            <span className={styles.date}>{departure_date}</span>
          </div>
          <div className={styles.arrowWithStops}>
            <span className={styles.stops}>{getStopsText(stops)}</span>
            <span className={styles.arrow}>→</span>
          </div>
          <div className={`${styles.column} ${styles.rightColumn}`}>
            <span className={styles.time}>{arrival_time}</span>
            <p className={styles.location}>
              {destination_name}, {destination}
            </p>
            <span className={styles.date}>{arrival_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

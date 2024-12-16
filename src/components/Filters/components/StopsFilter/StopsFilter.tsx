import React from "react";
import styles from "./StopsFilter.module.scss";
import { ALL_STOPS } from "../../../../constans/stops";

interface StopsFilterProps {
  stops: number[];
  onFilterChange: (filter: string, value: number[] | boolean) => void;
}

const StopsFilter: React.FC<StopsFilterProps> = ({ stops, onFilterChange }) => {
  const isAllSelected = stops.length === ALL_STOPS.length;

  const handleStopChange = (stopCount: number, checked: boolean) => {
    const updatedStops = checked ? [...stops, stopCount] : stops.filter((stop) => stop !== stopCount);
    onFilterChange("stops", updatedStops);
  };

  const handleSelectAllStops = (checked: boolean) => {
    onFilterChange("stops", checked ? ALL_STOPS : []);
  };

  const handleOnlySelectedStop = (stopCount: number) => {
    onFilterChange("stops", [stopCount]);
  };

  const canShowOnlyButton = stops.length > 1;

  return (
    <div className={styles.filtersStops}>
      <h2>Количество пересадок</h2>
      <div className="filter-group">
        <label className={styles.customCheckbox}>
          <input type="checkbox" checked={isAllSelected} onChange={(e) => handleSelectAllStops(e.target.checked)} />
          <span>Все</span>
        </label>
        {ALL_STOPS.map((stopCount) => (
          <label key={stopCount} className={styles.customCheckbox}>
            <input
              type="checkbox"
              checked={stops.includes(stopCount)}
              onChange={(e) => handleStopChange(stopCount, e.target.checked)}
            />
            <span>{stopCount === 0 ? "Без пересадок" : `${stopCount} пересадки`}</span>
            {stops.includes(stopCount) && canShowOnlyButton && (
              <button className={styles.onlyButton} onClick={() => handleOnlySelectedStop(stopCount)}>
                Только
              </button>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default StopsFilter;

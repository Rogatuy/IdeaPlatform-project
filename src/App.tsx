import React, { useState } from "react";
import TicketList from "./components/TicketList/TicketList";
import Filters from "./components/Filters/Filters";
import ticketsData from "./mock/tickets.json";
import { Ticket } from "./types/ticket";
import "./styles/main.scss";

const App = () => {
  const [filters, setFilters] = useState({
    nonStop: false,
    oneStop: false,
    twoPlusStops: false,
    currency: "RUB",
    stops: [],
  });

  const filteredTickets: Ticket[] = ticketsData.tickets.filter((ticket: Ticket) => {
    if (filters.nonStop && ticket.stops !== 0) return false;
    if (filters.oneStop && ticket.stops !== 1) return false;
    if (filters.twoPlusStops && ticket.stops < 2) return false;
    if (filters.stops.length > 0 && !filters.stops.includes(ticket.stops)) return false;
    return true;
  });

  const handleFilterChange = (filter: string, checked: boolean) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: checked,
    }));
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      currency: newCurrency,
    }));
  };

  const handleStopsFilterChange = (selectedStops: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      stops: selectedStops,
    }));
  };

  return (
    <div className="app">
      <div className="page-wrapper">
        <div className="filters">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onCurrencyChange={handleCurrencyChange}
            onStopsFilterChange={handleStopsFilterChange}
          />
        </div>

        <div className="content">
          <TicketList tickets={filteredTickets} currency={filters.currency} />
        </div>
      </div>
    </div>
  );
};

export default App;

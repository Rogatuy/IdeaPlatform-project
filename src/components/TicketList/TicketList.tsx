import React from "react";
import Ticket from "../Ticket/Ticket";
import { Ticket as TicketType } from "../../types/ticket";

interface TicketListProps {
  tickets: TicketType[];
  currency: string;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, currency }) => {
  return (
    <div className="ticket-list">
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Ticket
            key={ticket.id}
            origin={ticket.origin}
            origin_name={ticket.origin_name}
            destination={ticket.destination}
            destination_name={ticket.destination_name}
            departure_date={ticket.departure_date}
            departure_time={ticket.departure_time}
            arrival_date={ticket.arrival_date}
            arrival_time={ticket.arrival_time}
            carrier={ticket.carrier}
            stops={ticket.stops}
            price={ticket.price}
            currency={currency}
          />
        ))
      ) : (
        <div>Таких билетов нет.</div>
      )}
    </div>
  );
};

export default TicketList;

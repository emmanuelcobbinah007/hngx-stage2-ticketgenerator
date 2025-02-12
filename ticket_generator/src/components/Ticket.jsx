import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {loadAllTickets} from "../db/indexedDB";

const Ticket = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();

useEffect(() => {
  const fetchTicket = async () => {
    const allTickets = await loadAllTickets();
    const foundTicket = await allTickets.find(ticket => ticket.id === parseInt(id));
    setTicket(foundTicket);
  };

  fetchTicket();

}, [id]);

  return (
    <div>
    {ticket ? (
      <div>
        <h1>Ticket ID: {ticket.fullName}</h1>
        
      </div>
    ) : (
      <p>Loading ticket...</p>
    )}
  </div>
  )
}

export default Ticket
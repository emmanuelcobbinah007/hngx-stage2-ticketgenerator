import React, { useState, useEffect } from 'react'
import { loadAllTickets } from '../db/indexedDB'

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async() => {
            const allTickets = await loadAllTickets();

            console.log('Tickets fetched from IndexedDB: ', allTickets);

            setTickets(allTickets);
            setLoading(false);
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading tickets...</p>;
      }

  return (
    <div className="p-4">
    <h1 className="text-2xl font-semibold mb-4">All Tickets</h1>
    {tickets.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-medium">{ticket.fullName}</h2>
            <p className="text-gray-600">{ticket.email}</p>
            <p className="text-gray-500 text-sm">Status: {ticket.status}</p>
            <button className="mt-2 text-blue-500 hover:underline">View Details</button>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500">No tickets found.</p>
    )}
  </div>
  )
}

export default AllTickets
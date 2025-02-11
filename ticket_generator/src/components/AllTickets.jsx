import React, { useState, useEffect } from "react";
import { loadAllTickets, deleteTicket } from "../db/indexedDB";  // Ensure you have deleteTicket in your IndexedDB utils
import handleDownloadPDF from "../utils/handleDownloadPDF";
import { QRCodeCanvas } from "qrcode.react";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const allTickets = await loadAllTickets();
      setTickets(allTickets);
      setLoading(false);
    };
    fetchTickets();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ticket?");
    if (confirmDelete) {
      await deleteTicket(id);  // Delete from IndexedDB
      setTickets(tickets.filter(ticket => ticket.id !== id));  // Update UI
      console.log(`Ticket with id: ${id} has been deleted.`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-400">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="my-10 px-6">
      <h1 className="text-2xl font-semibold text-white text-center mb-8">
        Your Tickets
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 rounded-2xl border border-[#0E464F] bg-[#041E23] shadow-lg"
            >
              <div className="flex flex-col items-center">
                <img
                  src={ticket.avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full border-2 border-[#0E464F] mb-4"
                />
                <h2 className="text-lg font-bold text-white">{ticket.fullName}</h2>
                <p className="text-sm text-[#B0C4C7]">{ticket.event}</p>

                <button
                  className="mt-4 text-sm py-2 px-6 rounded-lg border border-[#07373F] bg-[#24A0B5] text-white hover:scale-105 duration-300 ease-in-out"
                  onClick={() => handleDownloadPDF(ticket)}
                >
                  Download Ticket
                </button>

                <button
                  className="mt-2 text-sm py-2 px-6 rounded-lg border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white duration-300 ease-in-out"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete Ticket
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
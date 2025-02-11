import React, { useState, useEffect } from "react";
import { loadAllTickets, deleteTicket } from "../db/indexedDB";  // Ensure you have deleteTicket in your IndexedDB utils
import handleDownloadPDF from "../utils/handleDownloadPDF";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { Toaster, toast } from "react-hot-toast";
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
    toast(
      (t) => (
        <div className="flex flex-col items-center p-4 rounded-lg shadow-lg">
          <p className="text-white mb-4">Are you sure you want to delete this ticket?</p>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={async () => {
                await deleteTicket(id);  // Delete the ticket
                setTickets(tickets.filter(ticket => ticket.id !== id));  // Update UI
                toast.dismiss(t.id);  // Close the confirmation toast
                toast.success("Ticket deleted successfully!");
              }}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000, 
        position: "top-right",
        style: {
            background: "#041E23",
            color: "white",  
            border: "2px solid #0E464F",
            boxShadow: "none",
          },
      }
    );
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
        <Toaster position="top-right" reverseOrder={false} />
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
                

                <div className="flex justify-center text-white text-center sm:text-left">
                <button
                  className="mt-4 mx-3 text-sm py-2 px-6 rounded-lg border border-[#07373F] bg-[#24A0B5] text-white hover:scale-105 duration-300 ease-in-out"
                  onClick={() => handleDownloadPDF(ticket)}
                >
                  View Details
                </button>
                <button
                  className="mt-4 mr-3 text-lg py-2 px-3 rounded-lg border border-[#24A0B5] hover:cursor-pointer text-white hover:scale-105 duration-300 ease-in-out"
                  onClick={() => handleDownloadPDF(ticket)}
                >
                  <IoCloudDownloadOutline />
                </button>
                </div>

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
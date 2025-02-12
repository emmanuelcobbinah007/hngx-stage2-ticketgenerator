import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadAllTickets } from "../db/indexedDB";
import TicketPic from "../assets/TICKET.png";

const Ticket = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchTicket = async () => {
      const allTickets = await loadAllTickets();
      const foundTicket = await allTickets.find(
        (ticket) => ticket.id === parseInt(id)
      );
      setTicket(foundTicket);
    };

    fetchTicket();
  }, [id]);

  return (
    <div>
      {ticket ? (
        <div className="w-full min-h-screen flex items-center justify-center text-white mt-6">
          <div className="w-md lg:w-[700px] p-6 bg-[#041E23] border border-[#0E464F] rounded-2xl shadow-lg">
            <div className="w-[95%] mx-auto">
              <div className="flex justify-between mb-2">
                <h2 className="text-2xl font-extralight font-[Jejumyeongjo]">
                  Ready
                </h2>
                <p className="text-sm text-gray-400">Step 3/3</p>
              </div>
              <div className="h-1 mb-4 bg-gray-700 rounded-full">
                <div className="h-1 w-[100%] bg-[#24A0B5] rounded-full"></div>
              </div>
            </div>

            <div className="p-3">
              <div className="mt-3 text-center">
                <h1 className="text-3xl font-semibold">
                  Your Ticket is Booked!
                </h1>
                <p className="mt-4">
                  Check your email for a copy or you can download
                </p>
              </div>

              <div
                className="w-[500px] mx-auto mt-[35px]"
                style={{
                  backgroundImage: `url(${TicketPic})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "600px",
                }}
              >
                <div className="p-3 pt-10">
                  <h3 className="text-xl font-bold mb-2 text-center font-road-rage">
                    Techember Fest "25
                  </h3>
                  <div className="sm:w-[60%] sm:mx-auto"></div>
                  <div className="text-center mt-2 text-sm">
                    <p className="text-sm">📍 [Event Location] &nbsp;&nbsp;</p>
                    <p className="text-sm pt-1">
                      &nbsp;&nbsp; March 15, 2025 | 7:00 PM
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <img
                      src={ticket.avatar}
                      alt="avatar"
                      className="w-[120px] h-[120px] rounded-xl object-cover border-4 border-[#24A0B5]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading ticket...</p>
      )}
    </div>
  );
};

export default Ticket;

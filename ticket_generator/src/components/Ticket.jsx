import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { loadAllTickets } from "../db/indexedDB";
import TicketPic from "../assets/TICKET.png";
import handleDownloadPDF from "../utils/handleDownloadPDF";
import { useNavigate } from "react-router-dom";
import bwipjs from "bwip-js";

const Ticket = () => {
  const [ticket, setTicket] = useState({});
  const { id } = useParams();

  const navigate = useNavigate(); 
  const canvasRef = useRef(null);

  const handleRebook = () => {
    navigate('/')
  }

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


  useEffect(() => {
    if (ticket.id && canvasRef.current) {
      try {
        bwipjs.toCanvas(canvasRef.current, {
          bcid: "code128",   // Barcode type
          text: ticket.id.toString(),  // Ensure ticket ID is a string
          scale: 3,          // Scaling factor
          height: 8,        // Height in mm
          includetext: false, // Include text below barcode
          textxalign: "center",  // White background
  barcolor: "FFFFFF",
        });
      } catch (error) {
        console.error("Failed to generate barcode:", error);
      }
    }
  }, [ticket.id]);
  


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
              id="divToPrint"
                className="pdf-content w-[500px] mx-auto mt-[35px]"
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
                  <div className="w-[230px] mt-4 mx-auto bg-[#08343C] border border-[#133D44] rounded-xl shadow-lg text-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[9px] text-gray-500 pt-1 pl-2">
                          Enter your name
                        </p>
                        <p className="text-[10px] font-semibold pl-2 pt-1 truncate">
                          {ticket.fullName}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 pt-1 pl-2">
                          Enter your email *
                        </p>
                        <p className="text-[10px] font-semibold pl-2 pt-1 truncate">
                          {ticket.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 pt-1 pl-2">
                          Ticket Type:
                        </p>
                        <p className="text-[10px] font-semibold pl-2 pt-1 truncate">
                          VIP
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 pt-1 pl-2">
                          Ticket for :
                        </p>
                        <p className="text-[10px] font-semibold pl-2 pt-1 truncate">
                          1
                        </p>
                      </div>
                      <div className="col-span-2">
                      <p className="text-[9px] text-gray-500 pt-1 pl-2">
                          Special Request
                        </p>
                        <p className="text-[10px] font-semibold pl-2 pt-1">
                          {ticket.specialRequest}
                        </p>
                      </div>
                    </div>
                  </div>
                  <canvas ref={canvasRef} className="mt-22 mx-auto" style={{ maxWidth: "100%" }}></canvas>

                </div>
              </div>





              <div className="flex flex-col sm:flex-row justify-between mt-12 space-x-2">
              <button
                className="hidden sm:inline-block w-full sm:w-1/2 my-1 py-2 rounded-lg border border-[#24A0B5] transition-all hover:cursor-pointer"
              >
                Download Ticket
              </button>
              <button
                className="w-full my-1 sm:w-1/2 py-2 rounded-lg bg-[#24A0B5] hover:bg-teal-400 transition-all hover:cursor-pointer"
                onClick={() => {handleRebook()}}
              >
                Book Another Ticket
              </button>
              <button
                className="sm:hidden w-full sm:w-1/2 my-1 py-2 rounded-lg border-[#24A0B5] transition-all hover:cursor-pointer"
              >
                Download Ticket
              </button>
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

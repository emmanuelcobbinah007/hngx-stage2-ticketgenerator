import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketSelection = () => {
  const [ticketType, setTicketType] = useState("Free");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/ticket-form");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white mt-6">
      <div className="w-full max-w-md lg:max-w-lg p-6 bg-[#041E23] border border-[#0E464F] rounded-2xl shadow-lg">
        {/* Header */}
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-extralight font-[Jejumyeongjo]">
              Ticket Selection
            </h2>
            <p className="text-sm text-gray-400">Step 1/3</p>
          </div>
          <div className="h-1 mb-4 bg-gray-700 rounded-full" >
            <div className="h-1 w-[33%] bg-[#24A0B5] rounded-full"></div>
          </div>

          {/* Event Info */}
          <div className="my-3 p-3 rounded-2xl border border-[#0E464F] bg-[#08252B]">
            <div className="p-2 bg-[#11232D] rounded-xl shadow-inner">
              <div className="my-3 rounded-2xl border border-[#0E464F] bg-[#08252B]">
                <div className="rounded-2xl p-3 bg-gradient-to-b from-[#0B1E26] via-[#11232D] to-[#0F2A35] shadow-inner">

                <h3 className="text-2xl font-bold mb-2 text-center font-road-rage">
                  Techember Fest "25
                </h3>
                <div className="sm:w-[60%] sm:mx-auto">
                <p className="text-sm text-center text-gray-400">
                  Join us for an unforgettable experience at [Event Name]!
                  Secure your spot now.
                </p>
                </div>
                <div className="text-center mt-2 text-sm">
                  <p className="text-sm">
                    📍 [Event Location] &nbsp;&nbsp; || &nbsp;&nbsp; March 15,
                    2025 | 7:00 PM
                  </p>
                </div>

                </div>
              </div>
            </div>

            {/* Ticket Type Selection */}
            <div className="mt-6">
              <p className="text-lg mb-2">Select Ticket Type:</p>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-2 space-y-2 lg:space-y-0">
                {["REGULAR ACCESS", "VIP ACCESS", "VVIP ACCESS"].map(
                  (type, index) => (
                    <button
                      key={index}
                      className={`hover:bg-[#12464E] w-full lg:flex-1 p-4 rounded-lg border ${
                        ticketType === type
                          ? "border-[#197686] bg-[#12464E]"
                          : "border-[#197686]"
                      } transition-all text-left`}
                      onClick={() => setTicketType(type)}
                    >
                      <p className="font-semibold">
                        {type === "REGULAR ACCESS" ? "Free" : "$150"}
                      </p>
                      <p className="text-sm text-gray-400">{type}</p>
                      <p className="text-xs mt-1 text-gray-500">20/52</p>
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Number of Tickets */}
            <div className="mt-6">
              <p className="text-lg mb-2">Number of Tickets</p>
              <select
                className="w-full p-3 rounded-lg bg-[#08252B] border border-gray-700 focus:outline-none"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-8 space-x-2">
              <button
                className="hidden w-full sm:w-1/2 my-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                onClick={() => alert("Canceled")}
              >
                Cancel
              </button>
              <button
                className="w-full my-1 sm:w-1/2 py-2 rounded-lg bg-[#24A0B5] hover:bg-teal-400 transition-all"
                onClick={handleNext}
              >
                Next
              </button>
              <button
                className="w-full sm:w-1/2 my-1 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
                onClick={() => alert("Canceled")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;

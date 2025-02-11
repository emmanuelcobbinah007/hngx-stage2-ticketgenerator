import React, { useState, useRef } from "react";
import { addTicket } from "../db/indexedDB";
import handleDownloadPDF from "../utils/handleDownloadPDF";
import handleConfetti from "../utils/handleConfetti";
import { QRCodeCanvas } from "qrcode.react";

const TicketForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  const qrCodeRef = useRef(null);

  // Function to convert QRCode to Base64
  const getQRCodeDataUrl = (ref) => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = ref.current.querySelector("canvas");
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "avatar") setAvatar(value);
    if (name === "event") setEvent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      alert("Please enter your full name (first and last name).");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (event.trim().length < 3) {
      alert("Please enter a valid event name (at least 3 characters).");
      return;
    }

    setLoading(true);

    const ticket = { fullName, email, avatar, event };

    await addTicket(ticket);
    setTicketData(ticket);
    setLoading(false);
    handleConfetti();

    setFullName("");
    setEmail("");
    setAvatar("");
    setEvent("");
  };

  return (
    <div className="my-6 px-4">
      <div className="p-6 rounded-2xl border border-[#0E464F] bg-[#041E23] max-w-[500px] mx-auto mb-10 shadow-lg">
        <div className="p-6 rounded-2xl border border-[#0E464F] bg-[#08252B]">
          <h1 className="px-2 py-3 text-lg text-center font-semibold text-white">
            Register For A Ticket
          </h1>
          <hr className="w-full mx-auto mt-4 bg-[#0E464F] h-px border-t-0 bg-gradient-to-r from-transparent via-[#0E464F] to-transparent opacity-25 dark:opacity-100" />
          <form className="p-2 mt-3" onSubmit={(e) => handleSubmit(e)}>
            <label className="text-md text-white" htmlFor="fullName">
              Enter your full name
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] bg-[#0E464F] text-white"
              onChange={handleChange}
              type="text"
              name="fullName"
              id="fullName"
              value={fullName}
            />

            <label className="text-md text-white" htmlFor="email">
              Enter your email *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] bg-[#0E464F] text-white"
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="hello@hng.com"
              value={email}
            />

            <label className="text-md text-white" htmlFor="avatar">
              Enter the link to your avatar *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] bg-[#0E464F] text-white"
              onChange={handleChange}
              type="url"
              name="avatar"
              id="avatar"
              placeholder="https://www.example.com/image"
              value={avatar}
            />

            <label className="text-md text-white" htmlFor="event">
              Enter the event name *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] bg-[#0E464F] text-white"
              onChange={handleChange}
              type="text"
              name="event"
              id="event"
              placeholder="HNG Internship 12.0"
              value={event}
            />

            <input
              className="text-md font-bold mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] bg-[#0E464F] text-white hover:cursor-pointer hover:scale-105 hover:bg-[#07373F] duration-300 ease-in-out"
              type="submit"
              value={loading ? "Submitting..." : "Generate Ticket"}
              disabled={loading}
            />
          </form>
        </div>
      </div>

      {ticketData && (
        <div className="mx-auto w-full sm:w-[90%] lg:w-[70%] ticket-card mt-8 p-6 border border-[#0E464F] bg-[#041E23] rounded-2xl shadow-lg">
          <div className="pdf-content p-6 rounded-lg border border-[#0E464F] bg-[#08252B]">
            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Your Ticket is Ready!
            </h2>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex justify-center mx-auto items-center mb-4 sm:mb-0">
                <div className="flex flex-col justify-center">
                  <QRCodeCanvas
                    value={email || "Default QR Data"}
                    size={200}
                    level="H"
                    includeMargin={true}
                    ref={qrCodeRef}
                    className="rounded-xl shadow-md"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center text-white text-center sm:text-left">
                <p className="text-lg">
                  <strong>{ticketData.fullName}</strong>
                </p>
                <p className="text-md">{ticketData.email}</p>
                <div className="py-4">
                  <p className="text-md">Event:</p>
                  <p className="font-bold text-xl">{ticketData.event}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <img
                src={ticketData.avatar}
                alt="Avatar"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#0E464F] transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
              />
            </div>
          </div>
          <div className="p-2 rounded-lg border border-[#0E464F] bg-[#08252B] flex flex-col sm:flex-row justify-center sm:justify-between mt-4">
            <button
              className="text-sm mx-2 py-2 px-6 rounded-lg border border-[#24A0B5] text-[#24A0B5] hover:scale-105 duration-300 ease-in-out mb-2 sm:mb-0"
              onClick={() => setTicketData(null)}
            >
              Book Another Ticket
            </button>
            <button
              className="text-sm mx-2 py-2 px-6 rounded-lg border border-[#07373F] bg-[#24A0B5] text-white hover:scale-105 duration-300 ease-in-out"
              onClick={() => handleDownloadPDF(ticketData)}
            >
              Download Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketForm;

import React, { useState, useEffect } from "react";
import { addTicket } from "../db/indexedDB";
import handleDownloadPDF from "../utils/handleDownloadPDF";
import handleConfetti from "../utils/handleConfetti";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {loadAllTickets} from "../db/indexedDB";

const TicketForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [arrayLength, setArrayLength] = useState();
  const [ticketData, setTicketData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
    const allTickets = await loadAllTickets();
    setArrayLength(allTickets.length);
    };
  
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "avatar") setAvatar(value);
    if (name === "specialRequest") setSpecialRequest(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(arrayLength)

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

    setLoading(true);
    
    const id = arrayLength + 1;

    const ticket = { id, fullName, email, avatar, specialRequest };

    await addTicket(ticket);
    setTicketData(ticket);
    setLoading(false);
    handleConfetti();

    navigate(`/ticket/${id}`);

    setFullName("");
    setEmail("");
    setAvatar("");
    setSpecialRequest("");
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="my-6 text-sm sm:text-lg sm:px-6 lg:px-8">
      <div className="p-6 rounded-2xl border border-[#0E464F] bg-[#041E23] max-w-[525px] mx-auto mb-10 shadow-lg">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between mb-2">
            <h2 className="text-2xl font-extralight font-[Jejumyeongjo]">
              Attendee Details
            </h2>
            <p className="text-sm text-gray-400">Step 2/3</p>
          </div>
          <div className="h-1 mb-4 bg-gray-700 rounded-full">
            <div className="h-1 w-[66%] bg-[#24A0B5] rounded-full"></div>
          </div>
          <div className="p-6 rounded-2xl border border-[#0E464F] bg-[#08252B]">
            <form
              className="p-2"
              onSubmit={(e) => handleSubmit(e)}
              aria-labelledby="ticket-form"
            >
              <fieldset>
                <legend id="ticket-form" className="sr-only">
                  Ticket Registration Form
                </legend>

                <label className="text-sm text-white" htmlFor="fullName">
                  Enter your name
                </label>
                <input
                  className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] text-white"
                  onChange={handleChange}
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={fullName}
                  required
                  aria-required="true"
                  aria-describedby="full-name-hint"
                />
                <div id="full-name-hint" className="sr-only">
                  Please provide your first and last name.
                </div>

                <label className="text-sm text-white" htmlFor="email">
                  Enter your email *
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdOutlineMail className="text-gray-500" />{" "}
                  {/* Your React Icon */}
                </div>
                <input
                  className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] text-white"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="hello@hng.com"
                  value={email}
                  required
                  aria-required="true"
                  aria-describedby="email-hint"
                />
                <div id="email-hint" className="sr-only">
                  Please enter a valid email address.
                </div>

                <label className="text-sm text-white" htmlFor="avatar">
                  Enter the link to your avatar *
                </label>
                <input
                  className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] text-white"
                  onChange={handleChange}
                  type="url"
                  name="avatar"
                  id="avatar"
                  placeholder="https://www.example.com/image"
                  value={avatar}
                  required
                  aria-required="true"
                  aria-describedby="avatar-hint"
                />
                <div id="avatar-hint" className="sr-only">
                  Please provide a valid avatar URL.
                </div>

                <label className="text-sm text-white" htmlFor="specialRequest">
                  Special Request?
                </label>
                <textarea
                  className="text-sm mt-2 mb-5 block w-full p-2 h-[127px] rounded-lg border border-[#07373F] text-white"
                  onChange={handleChange}
                  placeholder="Textarea"
                  type="text"
                  name="specialRequest"
                  id="specialRequest"
                  value={specialRequest}
                  aria-required="false"
                />

                <div className="flex flex-col sm:flex-row justify-between mt-8 space-x-2">
                  <button
                    className="hover:cursor-pointer hidden sm:inline-block text-sm w-full sm:w-1/2 my-1 py-2 rounded-lg border border-[#24A0B5] transition-all"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <input
                    type="submit"
                    disabled={loading}
                    aria-live="assertive"
                    className="hover:cursor-pointer text-sm w-full my-1 sm:w-1/2 py-2 rounded-lg bg-[#24A0B5] hover:bg-teal-400 transition-all hover:cursor-pointer"
                    value={loading ? "Submitting..." : "Generate Free Ticket"}
                  />

                  <button
                    className="sm:hidden text-sm w-full sm:w-1/2 my-1 py-2 rounded-lg hover:cursor-pointer border border-[#24A0B5] transition-all hover:cursor-pointer"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketForm;

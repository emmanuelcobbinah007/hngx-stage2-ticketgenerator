import React, { useState } from "react";
import { addTicket } from "../db/indexedDB";

const TicketForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [event, setEvent] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") setFullName(value);
    if (name === "email") setEmail(value);
    if (name === "avatar") setAvatar(value);
    if (name === "event") setEvent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Full Name Validation: Must contain at least two words
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) {
      alert("Please enter your full name (first and last name).");
      return;
    }

    // Email Validation: Basic regex for email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Avatar URL Validation: Check if it's a valid URL and ends with an image extension
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
    if (!urlPattern.test(avatar)) {
      alert(
        "Please enter a valid image URL (must end with .png, .jpg, .jpeg, or .gif)."
      );
      return;
    }

    // Event Name Validation: Ensure it has at least 3 characters
    if (event.trim().length < 3) {
      alert("Please enter a valid event name (at least 3 characters).");
      return;
    }

    // Adding ticket to IndexedDB
    const ticket = {
        fullName,
        email,
        avatar,
        event,
    }

    await addTicket(ticket);
    setLoading(false);


    // Simulate API call
    // setTimeout(() => {
    //   console.log("Form submitted:", { fullName, email, avatar, event });
    //   setLoading(false);
    // }, 2000);
  };

  return (
    <div className="my-6">
      <div className="p-4 rounded-2xl border border-[#0E464F] bg-[#041E23] max-w-[500px] mx-auto mb-10">
        <div className="p-4 rounded-2xl border border-[#0E464F] bg-[#08252B]">
          <h1 className="px-2 py-3 text-lg text-center">
            Register For A Ticket
          </h1>
          <hr className="w-full mx-auto mt-4 bg-[#0E464F] h-px border-t-0  bg-gradient-to-r from-transparent via-[#0E464F] to-transparent opacity-25 dark:opacity-100" />
          <form
            className="p-2 mt-3"
            action="submit"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="text-md" htmlFor="fullName" name="fullName">
              Enter your full name
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-1 rounded-lg border border-[#07373F]"
              onChange={handleChange}
              type="text"
              name="fullName"
              id="fullName"
            />

            <label className="text-md" htmlFor="email" name="email">
              Enter your email *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]"
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="hello@hng.com"
            />

            <label className="text-md" htmlFor="avatar" name="avatar">
              Enter the link to you avatar *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]"
              onChange={handleChange}
              type="url"
              name="avatar"
              id="avatar"
              placeholder="https://www.example.com/image"
            />

            <label className="text-md" htmlFor="event" name="event">
              Enter the event name *
            </label>
            <input
              className="text-sm mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F]"
              onChange={handleChange}
              type="text"
              name="event"
              id="event"
              placeholder="HNG Internship 12.0"
            />

            <input
              className="text-md font-bold mt-2 mb-5 block w-full p-2 rounded-lg border border-[#07373F] hover:cursor-pointer hover:scale-105 hover:bg-[#07373F] duration-300 ease-in-out"
              type="submit"
              value={loading ? "Submitting..." : "Generate Ticket"}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;

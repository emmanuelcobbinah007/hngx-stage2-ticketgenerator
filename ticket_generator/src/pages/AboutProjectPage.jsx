import React from "react";

const AboutProjectPAge = () => {
  return (
    <div className="p-6 rounded-2xl border border-[#0E464F] bg-[#041E23] max-w-[704px] my-12 mx-auto mb-10 shadow-lg">
      <div className="text-sm p-4">
        <p className="mb-8">
          Event Ticket Booking UI – Open Source Practice Project 🎟️
        </p>
        <p className="mt-5 mb-8">Overview</p>
        <p className="mt-5 mb-8">
          This is a beginner-friendly yet practical Event Ticket Booking UI
          designed for developers to clone, explore, and build upon. The design
          focuses on a seamless, login-free ticket reservation flow, allowing
          users to book event tickets quickly and efficiently.
        </p>
        <p className="mt-5 mb-8">
          The project consists of a three-step ticket booking flow, and
          developers can extend it further by integrating payment solutions, and
          ticket validation systems.
        </p>
        <p className="mt-5 mb-8">Flow and Features</p>
        <p className="mt-5">1️. Ticket Selection</p>
        <ul className="list-disc ml-5 mb-8">
          <li>Users can browse available tickets (Free & Paid).</li>
          <li>Ticket options are displayed in a list or card view.</li>
          <li>
            For Free Tickets → Clicking “Get Free Ticket” proceeds to attendee
            details.
          </li>
          <li>
            For Paid Tickets → Clicking “Purchase Ticket” would ideally open a
            payment modal.
          </li>
        </ul>

        <p className="mt-5">2. Attendee Details Form</p>
        <ul className="list-disc ml-5">
          <li>
            If the ticket is free, the user is taken directly to the Ticket
            Confirmation Page.
          </li>
          <li>
            If the ticket is paid, developers can integrate Stripe, Paystack, or
            Flutterwave to process payments before showing the confirmation
            page.
          </li>
          <li>Upon successful booking, users should receive:</li>
          <li>A visual ticket preview with a unique QR Code.</li>
          <li>
            An option to download the ticket as PDF or save it to their device.
          </li>
          <li>An email confirmation containing ticket details.</li>
        </ul>
        <p className=" mb-8">How to Build This 🚀</p>
        <p className="mt-5 mb-8">This UI can be implemented using:</p>
        <p className="mt-5">📌 Frontend (Next.js or React)</p>
        <ul className="list-disc ml-5  mb-8">
          <li> Component Breakdown:</li>
          <li>ITicketCard.tsx → Displays ticket details</li>
          <li>AttendeeForm.tsx → Captures user details</li>
          <li>PaymentModal.tsx → Handles payment processing</li>
          <li>SuccessScreen.tsx → Shows the final ticket preview</li>
          <li>
            State Management: React's Context API, Zustand, or Redux (if
            needed).
          </li>
          <li>
            File Handling: Users should be able to upload images (profile
            picture for ticket) using Firebase Storage, Cloudinary, or local
            preview with URL.createObjectURL().
          </li>
        </ul>
      </div>
      <div className="text-center text-7xl">
      💛Enjoy
      </div>
      <div className="p-2 rounded-lg border border-[#0E464F] bg-[#08252B] flex flex-col sm:flex-row justify-center sm:justify-center text-center mt-4 max-w-[504px] my-12 mx-auto mb-10 shadow-lg">
        <a href="/" className="text-sm mx-2 py-2 px-12 rounded-lg border border-[#24A0B5] text-[#24A0B5] hover:scale-105 duration-300 ease-in-out mb-2 sm:mb-0">Design File</a>
        <a href="https://www.github.com/emmanuelcobbinah007" className="text-sm mx-2 py-2 px-12 rounded-lg border border-[#07373F] bg-[#24A0B5] text-white hover:scale-105 duration-300 ease-in-out">GithubCode</a>
      </div>
    </div>
  );
};

export default AboutProjectPAge;

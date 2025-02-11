import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-[#05252C] flex justify-between items-center p-2 rounded-2xl border border-[#197686]">
      <Link to="/">
        <p className="text-xl">Ticker</p>
      </Link>
      <div className="text-md">
        <a
          className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
          href="#"
        >
          Events
        </a>
        <Link to="all-tickets">
          <a
            className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
            href="#"
          >
            My Tickets
          </a>
        </Link>
        <a
          className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
          href="#"
        >
          About Projects
        </a>
      </div>
      <Link to="/all-tickets">
        <button className="font-bold bg-white text-[#0A0C11] px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-105 duration-300">
          MY TICKETS
        </button>
      </Link>
    </div>
  );
};

export default Navbar;

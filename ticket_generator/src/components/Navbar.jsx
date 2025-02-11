import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import Ticz from "../assets/ticz.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#05252C] flex justify-between items-center p-2 rounded-2xl border border-[#197686] relative">
      <Link to="/">
        <img src={Ticz} alt="Ticz" className="h-7 mx-3" />
      </Link>
      <div className="hidden md:flex text-md items-center">
      <Link to='/'>
        <p
          className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
          onClick={closeMenu}
        >
          Generate Ticket
        </p>        
        </Link>
        <Link to="all-tickets">
          <p className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300">
            My Tickets
          </p>
        </Link>
        <p className="mx-3 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300">
          About Projects
        </p>
      </div>
      <Link to="/all-tickets" className="hidden md:block">
        <button className="font-bold bg-white text-[#0A0C11] px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-105 duration-300 mx-3">
          MY TICKETS
        </button>
      </Link>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-[#05252C] flex flex-col items-center transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none self-end m-4"
        >
          <IoClose size={24} />
        </button>
        <Link to='/'>
        <p
          className="my-4 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
          onClick={closeMenu}
        >
          Generate Ticket
        </p>        
        </Link>
        <Link to="all-tickets">
          <p
            className="my-4 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
            onClick={closeMenu}
          >
            My Tickets
          </p>
        </Link>
        <p
          className="my-4 text-[#b3b3b3] hover:text-[#fff] hover:scale-105 duration-300"
          onClick={closeMenu}
        >
          About Projects
        </p>
        <Link to="/all-tickets">
          <button
            className="font-bold bg-white text-[#0A0C11] px-4 py-2 rounded-lg hover:cursor-pointer hover:scale-105 duration-300 my-4"
            onClick={closeMenu}
          >
            MY TICKETS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
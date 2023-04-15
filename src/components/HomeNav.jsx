import React, { useState } from "react";
import logo from "../assets/djezzy.png";
import { MenuIcon } from "@heroicons/react/outline";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Contact from "../pages/Contact";
import Support from "../pages/Support";
import Home from "../pages/Home";

function HomeNav() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  function GotoLogin() {
    window.location.href = "/login";
  }

  function GotoRegister() {
    window.location.href = "/register";
  }
  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-100 fixed drop-shadow-lg  ">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <img className=" h-14 w-12 mr-4 ml-2 " src={logo} alt="djeezy logo" />
          <ul className="hidden md:flex font-bold ml-5">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:bg-neutral-300 rounded-lg p-3"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:bg-neutral-300 rounded-lg p-3"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="text-gray-800 hover:bg-neutral-300 rounded-lg p-3"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">
          <button
            onClick={GotoLogin}
            className="px-8 text-white border bg-red-600 border-red-600
        hover:bg-red-800 capitalize rounded-md py-3"
          >
            se connecter
          </button>
        </div>
        <div className="md:hidden text-gray-800" onClick={handleClick}>
          {!nav ? (
            <MenuIcon className="w-8 mr-4" />
          ) : (
            <FaTimesCircle size={25} className="w-16" />
          )}
        </div>
      </div>

      <ul
        className={
          !nav ? "hidden" : "absolute text-center bg-zinc-200 w-full px-8 py-4"
        }
      >
        <li className="block my-1 py-2 px-6 w-full text-gray-800 hover:bg-gray-100">
          <Link to="/" element={Home}>
            Accueil
          </Link>
        </li>
        <li className="block my-1 py-2 px-4 text-gray-800 hover:bg-gray-100">
          <Link to="/contact" element={Contact}>
            Contact
          </Link>
        </li>
        <li className="block my-1 py-2 px-4 text-gray-800 hover:bg-gray-100">
          <Link to="/support" element={Support}>
            Support
          </Link>
        </li>
        <div className="flex flex-col my-4">
          <button
            onClick={GotoRegister}
            className="px-8 text-white bg-red-600 hover:bg-red-800 capitalize rounded-md py-3 my-2"
          >
            S'inscrire
          </button>
          <button
            onClick={GotoLogin}
            className="px-8 bg-white text-red-600 border border-red-600 hover:bg-red-800 hover:text-white capitalize rounded-md py-3 my-2"
          >
            Se connecter
          </button>
        </div>
      </ul>
    </div>
  );
}

export default HomeNav;

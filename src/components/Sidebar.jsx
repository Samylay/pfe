import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { adminLinks, userLinks } from "../data/dummy";
import logo from "../assets/djezzy.png";
import { useStateContext } from "../contexts/ContextProvider";
import { useLocalState } from "../util/useLocalStorage";
import jwt_decode from "jwt-decode";

function Sidebar() {
  const [token, setToken] = useLocalState("", "token");
  const [role, setRole] = useState(getRoleFromToken());
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const [activeLink, setActiveLink] = useState("");
  
  let links = role === "ROLE_ADMIN" ? adminLinks : userLinks;
  function getRoleFromToken() {
    if (token) {
      if (token.length > 50) {
        const decodeToken = jwt_decode(token);
        return decodeToken.authorities[0].authority;
      }
    }
  }

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const normalLink =
    "flex items-center gap-5 pl-6 py-3 rounded-lg text-md text-gray-800 dark:hover:text-black hover:bg-red-300 hover:text-white m-2";
  const activeLinkClass =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 bg-red-600";

  const handleLinkClick = (link) => {
    setActiveLink(link);
    handleCloseSideBar();
  };

  return (
    <div className="w-full md:w-72 fixed shadow-md bg-white h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-bold tracking-tight text-slate-900"
            >
              <img
                className="h-12 w-12 mr-4 ml-2"
                src={logo}
                alt="djezzy logo"
              />
              <span>Djezzy</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(false)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
            >
              <MdOutlineCancel size={25} />
            </button>
          </div>
          <div className="mt-12">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-500 m-3 my-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    className={
                      link === activeLink ? activeLinkClass : normalLink
                    }
                    to={`/${link.goto}`}
                    key={link.name}
                    onClick={(link) => handleLinkClick(link)}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Sidebar;
